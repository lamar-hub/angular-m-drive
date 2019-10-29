import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {File} from './file.model';
import {filter, switchMap, take, tap} from 'rxjs/operators';
import {ToastService} from '../toast.service';

interface IFile {
  fileID: string;
  filename: string;
  size: number;
  lastModified: number;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {

  // tslint:disable-next-line:variable-name
  private _filesSubject = new BehaviorSubject<File[]>(null);

  constructor(private httpClient: HttpClient, private toastService: ToastService) {
  }

  get filesObservable() {
    return this._filesSubject.asObservable();
  }

  getAllFiles() {
    return this.httpClient
      .get<IFile[]>(`http://localhost:8080/api/files`)
      .pipe(
        tap(response => {
          const files: File[] = [];
          response.forEach(item => {
            files.push(new File(item.fileID, item.filename, item.size, item.lastModified));
          });
          this._filesSubject.next(files);
        })
      );
  }

  uploadFile(file: any) {
    const data = new FormData();
    data.set('file', file);

    let uploadedFile: File;

    return this.httpClient
      .post(`http://localhost:8080/api/files`, data, {reportProgress: true, observe: 'events'})
      .pipe(
        filter((response: any) => {
          if (response && response.type === 0) {
            console.log(response);
            this.toastService.show({header: 'Message', content: 'Start uploading...'});
          }
          if (response && response.type === 1) {
            console.log(response);
            this.toastService.show({header: 'Message', content: 'Half uploading...'});
          }
          return response && response.type === 4;
        }),
        switchMap(response => {
          if (response) {
            uploadedFile = new File(response.body.fileID, response.body.filename, response.body.size, response.body.lastModified);
          }
          return this.filesObservable;
        }),
        take(1),
        tap(files => {
          if (uploadedFile) {
            files.push(uploadedFile);
            this._filesSubject.next([...files]);
          }
        })
      );
  }

  deleteFile(fileID: string) {
    let responseFileID: string;
    console.log('MUnem');

    return this.httpClient
      .delete<{ fileID: string }>(`http://localhost:8080/api/files/${fileID}`)
      .pipe(
        switchMap(response => {
          if (response) {
            responseFileID = response.fileID;
          }
          return this.filesObservable;
        }),
        take(1),
        tap(files => {
          if (responseFileID) {
            this._filesSubject.next(files.filter(f => f.fileID !== responseFileID));
          }
        })
      );
  }

  shareFile(fileID: string, email: string, message: string) {
    return this.httpClient
      .post(`http://localhost:8080/api/shareds`, {fileID, username: email, message})
      .pipe(
        tap(response => {
          if (response) {
            alert(response);
          }
        })
      );
  }
}
