import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

export class UserIDInterceptor implements HttpInterceptor {

  private userID: string;

  constructor(private authService: AuthService) {
    this.authService.userObservable.subscribe(user => {
      if (user) {
        this.userID = user.userId;
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest = request;

    if (this.userID && request.method === 'GET' && (request.url.includes('files') || request.url.includes('shareds'))) {
      clonedRequest = request.clone({
        url: request.url + '/' + this.userID
      });
    }

    if (this.userID && request.method === 'POST' && (request.url.includes('files'))) {
      clonedRequest = request.clone({
        params: request.params.append('userID', this.userID)
      });
    }
    return next.handle(clonedRequest);
  }
}
