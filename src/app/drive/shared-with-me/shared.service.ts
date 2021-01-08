import {Injectable} from '@angular/core';
import {SharedFile} from './shared-file.model';
import {BehaviorSubject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, switchMap, take, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../notification.service';

export interface IShared {
  sharedFileFileId: string;
  sharedFileFilename: string;
  sharedFileSize: number;
  sharedFileLastModified: number;
  sharedFileUserEmail: string;
  sharedFileUserName: string;
  sharedFileUserSurname: string;
  message: string;
  date: number;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _sharedFilesSubject = new BehaviorSubject<SharedFile[]>(null);

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private notificationService: NotificationService) {
  }

  get sharedFilesObservable() {
    return this._sharedFilesSubject.asObservable();
  }

  getAllSharedFiles() {
    return this.httpClient
      .get<IShared[]>(`http://localhost:8080/api/shared-files`)
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
          const sharedFiles: SharedFile[] = [];
          response.sharedFiles.forEach(item => {
            sharedFiles.push(new SharedFile(
              item.sharedFileFileId,
              item.sharedFileFilename,
              item.sharedFileSize,
              item.sharedFileLastModified,
              item.sharedFileUserEmail,
              item.sharedFileUserName,
              item.sharedFileUserSurname,
              item.message,
              item.date
            ));
          });
          this._sharedFilesSubject.next(sharedFiles);
        })
      );
  }

  shareFile(fileId: string, email: string, message: string) {
    return this.httpClient
      .post(`http://localhost:8080/api/shared-files`, {fileId, sharedUserUsername: email, message})
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
          if (response) {
            console.log(response);
          }
        })
      );
  }

  unshare(sharedFile: SharedFile) {

    return this.httpClient
      .delete<{ fileID: string }>(`http://localhost:8080/api/shared-files/${sharedFile.sharedFileFileId}`)
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
          return this.sharedFilesObservable;
        }),
        take(1),
        tap((sharedFiles: SharedFile[]) => {
          this._sharedFilesSubject.next(sharedFiles.filter(s => s.sharedFileFileId !== sharedFile.sharedFileFileId));
        })
      );
  }
}
