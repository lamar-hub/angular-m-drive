import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

export class TokenInterceptor implements HttpInterceptor {

  // tslint:disable-next-line:variable-name
  private _token: string;

  constructor(private authService: AuthService) {
    this.authService.userObservable.subscribe(user => {
      if (user) {
        this._token = user.token;
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest = request;
    if (this._token) {
      clonedRequest = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + this._token)
      });
    }
    return next.handle(clonedRequest);
  }
}
