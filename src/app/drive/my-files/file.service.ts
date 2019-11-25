import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {File} from './file.model';
import {filter, switchMap, take, tap} from 'rxjs/operators';
import {IToast, ToastService} from '../toast.service';
import {AuthService} from '../../auth/auth.service';

interface IFile {
  fileID: string;
  filename: string;
  type: string;
  size: number;
  lastModified: number;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {

  // tslint:disable-next-line:variable-name
  private _filesSubject = new BehaviorSubject<File[]>(null);

  constructor(private httpClient: HttpClient, private toastService: ToastService, private authService: AuthService) {
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
            files.push(new File(item.fileID, item.filename, item.type, item.size, item.lastModified));
          });
          this._filesSubject.next(files);
        })
      );
  }

  uploadFile(file: any) {
    const data = new FormData();
    data.set('file', file);

    let uploadedFile: File;

    const toast: IToast = {header: 'File uploading', content: '0'};
    this.toastService.toasts.push(toast);

    return this.httpClient
      .post(`http://localhost:8080/api/files`, data, {reportProgress: true, observe: 'events'})
      .pipe(
        filter((response: any) => {
          if (response && response.type === 0) {
            console.log(response);
            toast.content = '0';
          }
          if (response && response.type === 1) {
            console.log(response);
            toast.content = Math.floor(response.loaded / response.total * 100).toString();
          }
          return response && response.type === 4;
        }),
        switchMap(response => {
          if (response) {
            uploadedFile = new File(
              response.body.fileID,
              response.body.filename,
              response.body.type,
              response.body.size,
              response.body.lastModified
            );
            this.authService.updateStored(uploadedFile.size);
            toast.header = 'File uploaded';
            toast.content = 'File "' + uploadedFile.filename + '" successfully uploaded!';
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

  deleteFile(file: File) {

    return this.httpClient
      .delete<{ fileID: string }>(`http://localhost:8080/api/files/${file.fileID}`)
      .pipe(
        switchMap(() => {
          return this.filesObservable;
        }),
        take(1),
        tap(files => {
          this._filesSubject.next(files.filter(f => f.fileID !== file.fileID));
        })
      );
  }
}
