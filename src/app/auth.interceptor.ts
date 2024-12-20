import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCustomService } from './auth-custom.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthCustomService);

  const apiUri = `${environment.apiUri}`;

  const jwt = localStorage.getItem('token');

  // we don't want to attach our token to a request to any other server
  // so we check that the request is to our own api

  if (req.url.startsWith(apiUri) && jwt != '') {
    const authRequest = req.clone({
      setHeaders: { authorization: `Bearer ${jwt}` },
    });

    return next(authRequest).pipe(
      catchError((err) => {
        console.log('Request failed ' + err.status);
        {
        }
        return throwError(() => err);
      })
    );
  } else {
    return next(req);
  }
};
