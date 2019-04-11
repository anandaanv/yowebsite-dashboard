import {Inject, Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(@Inject('BASE_API_URL') private baseUrl: string) {
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
            );
        } else {
            return next.handle(request.clone({
                    url: `${this.baseUrl}/${request.url}`,
                })
            );
        }
    }
}
