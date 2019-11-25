import {Injectable} from '@angular/core';
import {Shared} from './shared.model';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {switchMap, take, tap} from 'rxjs/operators';
import {ToastService} from '../toast.service';

export interface IShared {
  sharedFileFileID: string;
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

  // tslint:disable-next-line:variable-name
  private _sharedsSubject = new BehaviorSubject<Shared[]>(null);

  constructor(private httpClient: HttpClient, private toastService: ToastService) {
  }

  get sharedsObservable() {
    return this._sharedsSubject.asObservable();
  }

  getAllShareds() {
    return this.httpClient
      .get<IShared[]>(`http://localhost:8080/api/shareds`)
      .pipe(
        tap(response => {
          const shareds: Shared[] = [];
          response.forEach(item => {
            shareds.push(new Shared(
              item.sharedFileFileID,
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
          this._sharedsSubject.next(shareds);
        })
      );
  }

  shareFile(fileID: string, email: string, message: string) {
    return this.httpClient
      .post(`http://localhost:8080/api/shareds`, {sharedFileFileID: fileID, sharedFileUserEmail: email, message})
      .pipe(
        tap((response: any) => {
          if (response) {
            console.log(response);
            this.toastService.toasts.push(
              {
                header: 'Sharing',
                content: 'File "' + response.sharedFileFilename + '" is successfully shared to <' + email + '>.'
              }
            );
          }
        })
      );
  }

  unshare(shared: Shared) {

    return this.httpClient
      .delete<{ fileID: string }>(`http://localhost:8080/api/shareds/${shared.sharedFileID}`)
      .pipe(
        switchMap(() => {
          this.toastService.toasts.push(
            {
              header: 'Shared file',
              content: 'File "' + shared.sharedFileFilename + '" unshared successfully!'
            }
          );
          return this.sharedsObservable;
        }),
        take(1),
        tap((shareds: Shared[]) => {
          this._sharedsSubject.next(shareds.filter(s => s.sharedFileID !== shared.sharedFileID));
        })
      );
  }
}
