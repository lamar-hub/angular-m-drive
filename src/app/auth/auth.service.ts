import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {User} from './user.model';
import {ToastService} from '../drive/toast.service';

export interface IUser {
  userId: string;
  email: string;
  name: string;
  surname: string;
  stored: number;
  limit: number;
  jwtToken: string;
  twoFactorVerification: boolean;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line:variable-name
  private _userSubject = new BehaviorSubject<User>(null);
  // tslint:disable-next-line:variable-name
  private _user: User;

  constructor(private router: Router, private httpClient: HttpClient, private toastService: ToastService) {
  }

  get userObservable() {
    return this._userSubject.asObservable();
  }

  updateStored(size: number) {
    this._user.stored = this._user.stored + size;
    this._userSubject.next(this._user);
  }

  signUp(param: { password: string; surname: string; name: string; email: string, phone: string }) {
    return this.httpClient
      .post<IUser>(
        `http://localhost:8080/sign-up`,
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
            this.router.navigateByUrl('/log-in');
          }
        })
      );
  }

  login(param: { password: string; email: string }) {
    return this.httpClient
      .post<IUser>(
        `http://localhost:8080/log-in`,
        {
          email: param.email,
          password: param.password
        }
      )
      .pipe(
        tap(response => {
          if (response) {
            const user = new User(
              response.userId,
              response.email,
              response.name,
              response.surname,
              response.stored,
              response.limit,
              response.jwtToken,
              response.twoFactorVerification,
              response.active
            );
            this._userSubject.next(user);
            this._user = user;
            this.router.navigateByUrl('/drive');
          }
        })
      );
  }

  loginVerificationCode(param: { password: string; code: string; email: string }) {
    return this.httpClient
      .post<IUser>(
        `http://localhost:8080/log-in-code`,
        {
          email: param.email,
          password: param.password,
          verificationCode: param.code
        }
      )
      .pipe(
        tap(response => {
          if (response) {
            const user = new User(
              response.userId,
              response.email,
              response.name,
              response.surname,
              response.stored,
              response.limit,
              response.jwtToken,
              response.twoFactorVerification,
              response.active
            );
            this._userSubject.next(user);
            this._user = user;
            this.router.navigateByUrl('/drive');
          }
        })
      );
  }

  logout() {
    this._userSubject.next(null);
    this._user = null;
    this.toastService.clear();
    this.router.navigateByUrl('/auth');
  }

  upgradeUser(plan: string) {
    // @ts-ignore
    return this.httpClient
      .patch(`http://localhost:8080/users`, {})
      .pipe(
        tap((response: any) => {
          console.log(response);
          if (response) {
            const user = new User(
              response.userId,
              response.email,
              response.name,
              response.surname,
              response.stored,
              response.limit,
              response.jwtToken,
              response.twoFactorVerification,
              response.active
            );
            this._userSubject.next(user);
            this._user = user;
          }
        })
      );
  }

  deactivateUser() {
    return this.httpClient
      .delete(`http://localhost:8080/users`);
  }

}
