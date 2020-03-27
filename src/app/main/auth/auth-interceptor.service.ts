import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from './auth.service';
import { take, exhaustMap, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SweetAlert } from 'app/services/sweet-alert.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router, private alert: SweetAlert) { }

    // intercept(req: HttpRequest<any>, next: HttpHandler) {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
                // console.log(modifiedReq);
                return next.handle(modifiedReq);
            })
        );
    }
}