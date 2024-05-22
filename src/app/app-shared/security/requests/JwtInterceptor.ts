import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SharedConfiguration } from '../../../core/shared/sharedConfiguration';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    token: string;
    apiUrl:string;
    constructor(private sharedConfiguration: SharedConfiguration) {
        this.apiUrl = this.sharedConfiguration.ServiceBaseUrl;
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tokenStr = localStorage.getItem('Token');
        if (tokenStr ) {
            this.token = JSON.parse(tokenStr).Value;
            request = request.clone({
                setHeaders: {
                    'Authorization': "Bearer "+ this.token,
                    'Content-Type' : "application/json",
                    'token': this.token,
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,content-type,accept',
                    'Access-Control-Allow-Origin':this.apiUrl
                }
            });
        }
        else{
            request = request.clone({
                setHeaders: {
                    'Content-Type' : "application/json",
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,content-type,accept',
                    'Access-Control-Allow-Origin':this.apiUrl
                }
            });
        }

        return next.handle(request);
    }
}
