import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  let platform = inject(PLATFORM_ID);
  let lang = isPlatformBrowser(platform) ? localStorage.getItem('lang') ?? 'en' : 'en';
  let newRequest = req.clone({
    headers: req.headers.set('Accept-Language', lang)
  });
  return next(newRequest);
};
