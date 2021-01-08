import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {UploadProgressService} from '../drive/upload-progress.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../drive/notification.service';
import {Plan} from './plan.model';

export interface IUser {
  userId: string;
  email: string;
  phone: string;
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

  constructor(private router: Router,
              private httpClient: HttpClient,
              private toastService: UploadProgressService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar) {
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
          phone: param.phone,
          password: param.password
        }
      )
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
        tap(response => {
          if (response) {
            const user = new User(
              response.userId,
              response.email,
              response.phone,
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
        tap(response => {
          if (response) {
            const user = new User(
              response.userId,
              response.email,
              response.phone,
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

  upgradeUser(plan: Plan) {
    console.log('plan' + plan);
    // @ts-ignore
    return this.httpClient
      .put(`http://localhost:8080/api/users`, {plan})
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
          console.log(response);
          if (response) {
            const user = new User(
              response.userId,
              response.email,
              response.phone,
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

  updateUser(user: User) {
    return this.httpClient
      .patch(`http://localhost:8080/api/users`, {
        phone: user.phone,
        name: user.name,
        surname: user.surname,
        active: user.active,
        twoFactorVerification: user.twoFactorVerification
      })
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
          console.log(response);
          if (response) {
            const newUser = new User(
              response.userId,
              response.email,
              response.phone,
              response.name,
              response.surname,
              response.stored,
              response.limit,
              user.token,
              response.twoFactorVerification,
              response.active
            );
            this._userSubject.next(newUser);
            this._user = newUser;
            this.router.navigateByUrl('/drive/my-files');
          }
        })
      );
  }

}
