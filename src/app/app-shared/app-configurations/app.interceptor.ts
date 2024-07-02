import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  let platform = inject(PLATFORM_ID);
  let lang = isPlatformBrowser(platform) ? localStorage.getItem('lang') ?? 'en' : 'en';
  let tokenStr = isPlatformBrowser(platform) ? localStorage.getItem('Token') ?? '' : '';
  let newRequest = req.clone({
    headers: req.headers.set('Accept-Language', lang)
  });
  if (tokenStr ) {
    newRequest = newRequest.clone({
        setHeaders: {
            'Authorization': "Bearer "+ JSON.parse(tokenStr).Value,
            'Content-Type' : "application/json",
            'token': JSON.parse(tokenStr).Value,
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,content-type,accept',
        }
    });
}
else{
  newRequest = newRequest.clone({
        setHeaders: {
            'Content-Type' : "application/json",
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,content-type,accept',
        }
    });
}
  return next(newRequest);
};
