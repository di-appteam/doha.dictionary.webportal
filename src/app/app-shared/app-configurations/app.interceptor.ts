import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Http } from '@capacitor-community/http';
import { Observable, from } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';

export const appInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let platform = inject(PLATFORM_ID);
  let lang = isPlatformBrowser(platform) ? localStorage.getItem('lang') ?? 'en' : 'en';
  let tokenStr = isPlatformBrowser(platform) ? localStorage.getItem('Token') ?? '' : '';

  let headers: { [key: string]: string } = {
    'Accept-Language': lang,
    'Content-Type': 'application/json'
  };

  if (tokenStr) {
    let tokenValue = JSON.parse(tokenStr).Value;
    headers['Authorization'] = `Bearer ${tokenValue}`;
    headers['token'] = tokenValue;
  }

  // ✅ If running on mobile (iOS/Android), use Capacitor HTTP (Convert to Angular HttpResponse)
  if (Capacitor.isNativePlatform()) {
    return from(Http.request({
      method: req.method as any,
      url: req.urlWithParams,
      headers: headers,
      data: req.body || {}
    }).then(response => {
      return new HttpResponse({
        body: response.data,
        status: response.status,
        statusText: 'OK',
        url: req.urlWithParams
      });
    }));
  }

  // ✅ Default behavior for web (HttpClient)
  const newRequest = req.clone({ setHeaders: headers });
  return next(newRequest);
};
