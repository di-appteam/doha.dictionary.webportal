import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Http } from '@capacitor-community/http';
import { Observable, from } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse, HttpParams } from '@angular/common/http';

// ✅ Function to Convert HttpParams to a Plain Object
function convertHttpParamsToObject(params: HttpParams): Record<string, string> {
  let paramObj: Record<string, string> = {};
  params.keys().forEach(key => {
    paramObj[key] = params.get(key) || '';
  });
  return paramObj;
}

export const appInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let platform = inject(PLATFORM_ID);
  let lang = isPlatformBrowser(platform) ? localStorage.getItem('lang') ?? 'en' : 'en';
  let tokenStr = isPlatformBrowser(platform) ? localStorage.getItem('Token') ?? '' : '';

  let headers: { [key: string]: string } = {
    'Accept-Language': lang,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,content-type,accept'
  };

  if (tokenStr) {
    let tokenValue = JSON.parse(tokenStr).Value;
    headers['Authorization'] = `Bearer ${tokenValue}`;
    headers['token'] = tokenValue;
  }

  // ✅ Convert HttpParams to Object
  const paramsObject = req.params ? convertHttpParamsToObject(req.params) : {};

  // ✅ If running on mobile (iOS/Android), use Capacitor HTTP
  if (Capacitor.isNativePlatform()) {
    // ✅ Use `Http.get()` for GET requests
    if (req.method.toUpperCase() === 'GET') {
      return from(Http.get({
        url: req.urlWithParams,
        headers: headers,
        params: paramsObject
      }).then(response => {
        return new HttpResponse({
          body: response.data,
          status: response.status,
          statusText: 'OK',
          url: req.urlWithParams
        });
      }));
    } else {
      // ✅ Use `Http.request()` for other methods (POST, PUT, DELETE)
      return from(Http.request({
        method: req.method as any,
        url: req.urlWithParams,
        headers: headers,
        params: paramsObject, // 👈 Converted to an object
        data: req.body || {},
        readTimeout: 30000 // ⏳ Increase timeout for large responses
      }).then(response => {
        return new HttpResponse({
          body: response.data,
          status: response.status,
          statusText: 'OK',
          url: req.urlWithParams
        });
      }));
    }
  }

  // ✅ Default behavior for web (HttpClient)
  const newRequest = req.clone({ setHeaders: headers });
  return next(newRequest);
};
