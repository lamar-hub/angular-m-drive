import {Injectable} from '@angular/core';
import {Shared} from './shared.model';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {switchMap, take, tap} from 'rxjs/operators';

interface IShared {
  sharedFileID: string;
  sharedFileFilename: string;
  sharedFileSize: number;
  sharedFileLastModified: number;
  sharedUserEmail: string;
  sharedUserName: string;
  sharedUserSurname: string;
  message: string;
  date: number;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // tslint:disable-next-line:variable-name
  private _sharedsSubject = new BehaviorSubject<Shared[]>(null);

  constructor(private httpClient: HttpClient) {
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
              item.sharedFileID,
              item.sharedFileFilename,
              item.sharedFileSize,
              item.sharedFileLastModified,
              item.sharedUserEmail,
              item.sharedUserName,
              item.sharedUserSurname,
              item.message,
              item.date
            ));
          });
          this._sharedsSubject.next(shareds);
        })
      );
  }

  unshare(fileID: string, email: string) {
    let responseFileID: string;

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {fileID, username: email}
    };

    return this.httpClient
      .delete<{ fileID: string }>(`http://localhost:8080/api/shareds`, httpOptions)
      .pipe(
        switchMap(response => {
          if (response) {
            responseFileID = response.fileID;
          }
          return this.sharedsObservable;
        }),
        take(1),
        tap((shareds: Shared[]) => {
          if (responseFileID) {
            shareds.filter(s => s.sharedFileID !== responseFileID);
            this._sharedsSubject.next(shareds.filter(s => s.sharedFileID !== responseFileID));
          }
        })
      );
  }
}
