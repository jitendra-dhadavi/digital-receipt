import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const modifyRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  return next(modifyRequest);
};
