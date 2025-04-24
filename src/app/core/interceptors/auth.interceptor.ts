import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
 import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../services/loading.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const loadingService = inject(LoadingService);
  const messageService = inject(MessageService);

  loadingService.showLoading();
 
  const token = localStorage.getItem('token');
  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    tap({
      error: (error) => {
        if (error.status === 401) {
          router.navigate(['/login']);
        }
      },
    }),
    finalize(() => {
      loadingService.hideLoading();
    }),
    catchError((error) => {
      console.log('error',error);
      
      const errorResponse = error.error;

      

      if (errorResponse.validations && Array.isArray(errorResponse.validations)) {
        errorResponse.validations.forEach((val: { property: any; message: any; }) => {
          messageService.add({ severity: 'warn', summary: val.property, detail: val.message });
        });
      }

      return throwError(() => new Error(errorResponse.message));
    })
  );
};
