import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Http, HttpOptions, HttpResponse as CapacitorHttpResponse } from '@capacitor-community/http';
import { Observable, from } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse, HttpParams } from '@angular/common/http';

// ✅ Convert HttpParams to Plain Object
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
    if (req.urlWithParams.includes('assets/')) {
      console.log("Ahmed Test : " + req.urlWithParams);
      return next(req);
    }
    let natReq = PrepareRequest(tokenStr, req.urlWithParams, req.method, req.body);

    return from(Http.request(natReq).then((response: CapacitorHttpResponse) => {
      return new HttpResponse({
        body: response.data,
        status: response.status,
        statusText: response.status >= 200 && response.status < 300 ? 'OK' : 'Error',
        url: req.urlWithParams
      }) as HttpEvent<unknown>;
    }));
  }

  // ✅ Default behavior for web (HttpClient)
  const newRequest = req.clone({ setHeaders: headers });
  return next(newRequest);
};

// ✅ Function to Prepare HTTP Request Options
function PrepareRequest(token: string, url: string, method: string, data: any, isFileUpload: boolean = false): HttpOptions {
  let contentType: string = isFileUpload ? "multipart/form-data" : "application/json";
  let headers: any = { 'Content-Type': contentType };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const options: HttpOptions = {
    url: url,
    method: method,
    headers: headers,
    disableRedirects: false
  };

  if (data) {
    options.data = data;
  }

  return options;
}
