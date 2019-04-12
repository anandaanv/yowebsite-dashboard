import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(@Inject('BASE_API_URL') private baseUrl: string, private mainRoute: Router) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('token')) {
      const token: String = localStorage.getItem('token');
      return next.handle(request.clone({
          url: `${this.baseUrl}/${request.url}`,
          setHeaders: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        })
      ).pipe(catchError(err => {
        if (err.status === 401) {
          this.logout();
          return Observable.throw(err.statusText);
        }
      }));
    } else {
      return next.handle(request.clone({
          url: `${this.baseUrl}/${request.url}`,
        })
      ).pipe(catchError(err => {
        if (err.status === 401) {
          this.logout();
          return Observable.throw(err.statusText);
        }
      }));
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.mainRoute.navigate(['login']);
  }
}
