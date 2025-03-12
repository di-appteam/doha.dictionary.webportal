import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Http, HttpOptions, HttpResponse as CapacitorHttpResponse } from '@capacitor-community/http';
import { Observable, from, throwError, of } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse, HttpParams } from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';

// ✅ Convert HttpParams to a Plain Object
function convertHttpParamsToObject(params: HttpParams | null): Record<string, string> {
  let paramObj: Record<string, string> = {};
  if (params) {
    params.keys().forEach((key) => {
      paramObj[key] = params.get(key) || '';
    });
  }
  return paramObj;
}

export const appInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  let platform = inject(PLATFORM_ID);
  let lang = isPlatformBrowser(platform) ? localStorage.getItem('lang') ?? 'en' : 'en';
  let tokenStr = isPlatformBrowser(platform) ? localStorage.getItem('Token') ?? '' : '';

  let headers: { [key: string]: string } = {
    'Accept-Language': lang,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,content-type,accept',
  };

  if (tokenStr) {
    try {
      let tokenValue = JSON.parse(tokenStr).Value;
      headers['Authorization'] = `Bearer ${tokenValue}`;
      headers['token'] = tokenValue;
    } catch (error) {
      console.error('Invalid token format:', error);
    }
  }

  // ✅ Convert HttpParams to an object
  const paramsObject = convertHttpParamsToObject(req.params);

  // ✅ Skip Interceptor for Static Assets
  if (req.urlWithParams.includes('assets/')) {
    console.log("Skipping interceptor for local assets:", req.urlWithParams);
    return next(req);
  }

  // ✅ If running on mobile (iOS/Android), use Capacitor HTTP
  if (Capacitor.isNativePlatform()) {
    console.log("Full URL:", req.urlWithParams);

    if (req.method.toUpperCase() === 'GET') {
      const getRequest: HttpOptions = {
        url: req.urlWithParams,
        headers: headers,
        method: 'GET',
        params: paramsObject ?? {},
      };

      return from(Http.get(getRequest)).pipe(
        mergeMap((response: CapacitorHttpResponse) => of(handleHttpResponse(response, req))),
        catchError((error) => handleHttpError(error))
      );
    } else {
      const natReq = PrepareRequest(tokenStr, req.urlWithParams, req.method, req.body);

      return from(Http.request(natReq)).pipe(
        mergeMap((response: CapacitorHttpResponse) => of(handleHttpResponse(response, req))),
        catchError((error) => handleHttpError(error))
      );
    }
  }

  // ✅ Default behavior for web (HttpClient)
  const newRequest = req.clone({ setHeaders: headers });
  return next(newRequest).pipe(catchError((error) => handleHttpError(error)));
};

// ✅ Function to Prepare HTTP Request Options
function PrepareRequest(
  token: string,
  url: string,
  method: string,
  data: any,
  isFileUpload: boolean = false
): HttpOptions {
  let contentType: string = isFileUpload ? 'multipart/form-data' : 'application/json';
  let headers: any = { 'Content-Type': contentType };

  if (token) {
    try {
      let tokenValue = JSON.parse(token).Value;
      headers['Authorization'] = `Bearer ${tokenValue}`;
      headers['token'] = tokenValue;
    } catch (error) {
      console.error('Error parsing token:', error);
    }
  }

  const options: HttpOptions = {
    url: url,
    method: method,
    headers: headers,
    disableRedirects: false,
  };

  if (data) {
    options.data = data;
  }

  return options;
}

// ✅ Function to Handle HTTP Responses
function handleHttpResponse(response: CapacitorHttpResponse, req: HttpRequest<unknown>): HttpResponse<unknown> {
  if (response.status === 401 || response.status === 500) {
    if (response.data?.ExceptionMessage?.includes('IDX10223')) {
      console.warn('Token expired, clearing session...');
      localStorage.removeItem('Token'); // ✅ Clear token
      window.location.reload();
    }
  }

  return new HttpResponse<unknown>({
    body: response.data,
    status: response.status,
    statusText: response.status >= 200 && response.status < 300 ? 'OK' : 'Error',
    url: req.urlWithParams,
  });
}

// ✅ Function to Handle HTTP Errors
function handleHttpError(error: any): Observable<HttpEvent<unknown>> {
  console.error('HTTP Error:', error);

  if (error.status === 401 || error.status === 500) {
    if (error.data?.ExceptionMessage?.includes('IDX10223')) {
      console.warn('Token expired, clearing session...');
      localStorage.removeItem('Token'); // ✅ Clear token
      window.location.reload();
    }
  }

  return throwError(() => error);
}
