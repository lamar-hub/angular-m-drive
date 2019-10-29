import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .userObservable
      .pipe(
        take(1),
        switchMap(user => of(!!user)),
        tap(existUser => {
          if (!existUser) {
             this.router.navigateByUrl('/auth');
          }
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService
      .userObservable
      .pipe(
        take(1),
        switchMap(user => of(!!user)),
        tap(existUser => {
          if (!existUser) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }

}
