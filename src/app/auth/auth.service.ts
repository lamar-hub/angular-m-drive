import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {User} from './user.model';

interface IUser {
  userID: string;
  email: string;
  name: string;
  surname: string;
  stored: number;
  limit: number;
  token: string;
  expirationTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line:variable-name
  private _userSubject = new BehaviorSubject<User>(null);

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  get userObservable() {
    return this._userSubject.asObservable();
  }

  signUp(param: { password: string; surname: string; name: string; email: string }) {
    return this.httpClient
      .post<IUser>(
        `http://localhost:8080/signup`,
        {
          name: param.name,
          surname: param.surname,
          email: param.email,
          password: param.password
        }
      )
      .pipe(
        tap(response => {
          if (response) {
            const user = new User(
              response.userID,
              response.email,
              response.name,
              response.surname,
              response.stored,
              response.limit,
              response.token,
              response.expirationTime
            );
            this._userSubject.next(user);
            this.router.navigateByUrl('/drive');
          }
        })
      );
  }

  login(param: { password: string; email: string }) {
    return this.httpClient
      .post<IUser>(
        `http://localhost:8080/auth`,
        {
          username: param.email,
          password: param.password
        }
      )
      .pipe(
        tap(response => {
          if (response) {
            const user = new User(
              response.userID,
              response.email,
              response.name,
              response.surname,
              response.stored,
              response.limit,
              response.token,
              response.expirationTime
            );
            this._userSubject.next(user);
            this.router.navigateByUrl('/drive');
          }
        })
      );
  }
}
