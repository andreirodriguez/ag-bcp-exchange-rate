import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class InterceptorService {
    
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (user != undefined) {//validar si el usuario esta en sesion existe token
            const token = JSON.parse(sessionStorage.getItem('user')).token;
            httpRequest = httpRequest.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}` //concatenar token
                }
            });
        }
        return next.handle(httpRequest);
    }
}
