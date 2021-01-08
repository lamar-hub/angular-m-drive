import {Injectable} from '@angular/core';
import {BehaviorSubject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {File} from './file.model';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {IUploadFile, UploadProgressService} from '../upload-progress.service';
import {AuthService} from '../../auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../notification.service';

interface IFile {
  fileId: string;
  filename: string;
  type: string;
  size: number;
  lastModified: number;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private _filesSubject = new BehaviorSubject<File[]>(null);

  constructor(private httpClient: HttpClient,
              private uploadProgressService: UploadProgressService,
              private notificationService: NotificationService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
  }

  get filesObservable() {
    return this._filesSubject.asObservable();
  }

  getAllFiles() {
    return this.httpClient
      .get<IFile[]>(`http://localhost:8080/api/files`)
      .pipe(
        catchError(err => {
          const notification = {
            type: 'ERROR',
            message: err.error.message
          };

          this.notificationService.addNotification(notification);

          this._snackBar.open(notification.type + ' ' + notification.message, 'Close', {
            duration: 10000,
          });
          return throwError(err);
        }),
        tap((response: any) => {
          const files: File[] = [];
          response.files.forEach(item => {
            files.push(new File(item.fileId, item.filename, item.type, item.size, item.lastModified));
          });
          this._filesSubject.next(files);
        })
      );
  }

  uploadFile(file: any) {
    console.log(file);
    const data = new FormData();
    data.set('file', file);

    let uploadedFile: File;

    const upload: IUploadFile = {
      name: file.name,
      uploaded: 0,
      size: file.size,
      success: false
    };
    this.uploadProgressService.addUploadFile(upload);

    return this.httpClient
      .post(`http://localhost:8080/api/files`, data, {reportProgress: true, observe: 'events'})
      .pipe(
        catchError(err => {
          const notification = {
            type: 'ERROR',
            message: err.error.message
          };

          this.notificationService.addNotification(notification);

          this._snackBar.open(notification.type + ' ' + notification.message, 'Close', {
            duration: 10000,
          });
          return throwError(err);
        }),
        filter((response: any) => {
          if (response && response.type === 0) {
            console.log(response);
            upload.uploaded = 0;
          }
          if (response && response.type === 1) {
            console.log(response);
            upload.uploaded = Math.floor(response.loaded / response.total * 100);
          }
          return response && response.type === 4;
        }),
        switchMap(response => {
          if (response) {
            console.log(response);
            uploadedFile = new File(
              response.body.fileId,
              response.body.filename,
              response.body.type,
              response.body.size,
              response.body.lastModified
            );
            this.authService.updateStored(uploadedFile.size);
            upload.success = true;
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
      .delete<{ fileID: string }>(`http://localhost:8080/api/files/${file.fileId}`)
      .pipe(
        catchError(err => {
          const notification = {
            type: 'ERROR',
            message: err.error.message
          };

          this.notificationService.addNotification(notification);

          this._snackBar.open(notification.type + ' ' + notification.message, 'Close', {
            duration: 10000,
          });
          return throwError(err);
        }),
        switchMap(() => {
          return this.filesObservable;
        }),
        take(1),
        tap(files => {
          this._filesSubject.next(files.filter(f => f.fileId !== file.fileId));
        })
      );
  }
}
