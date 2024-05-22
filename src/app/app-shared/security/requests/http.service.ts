
import { throwError as observableThrowError, Observable } from 'rxjs';

import { finalize, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';


import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SharedConfiguration } from '../../services/config.service';

@Injectable()
export class HttpService  {

    apiUrl = '';
    requestList : string[] = [];
    token: string ="";
    // Http Headers
    defaultOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(
        private http: HttpClient,
        private sharedConfiguration: SharedConfiguration
    ) {
        this.apiUrl = this.sharedConfiguration.ServiceBaseUrl;
    }

    get(url: string, options?: any): Observable<any> {

        //if (!this.requestList.includes(url))
        //    this.requestList.push(url);
        //else
        //    return;

        this.showLoader();


        return this.http.get(this.getFullUrl(url), options).pipe(
            catchError(this.onCatch),
            tap((res) => {
                //this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            }),
            finalize(() => {
                this.onEnd();
            }));

    }

    post(url: string, body: any, options?: any): Observable<any> {

        //if (!this.requestList.includes(url))
        //    this.requestList.push(url);
        //else
        //    return;

        this.showLoader();


        return this.http.post(this.getFullUrl(url), body, options).pipe(
            catchError(this.onCatch),
            tap((res) => {
                //this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            }),
            finalize(() => {
                this.onEnd();
            }));

    }

    private getFullUrl(url: string): string {
        return this.apiUrl + url;
    }

    private onCatch(error: any): Observable<any> {
        return observableThrowError(error);
    }

    private onSuccess(res:any): void {
        //this.requestEnd(res.url);
        //console.log('Request successful');
    }

    private onError(res:any): void {
        this.requestEnd(res.url);
        //console.log('Error, status code: ' + res.status);
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private requestEnd(url: string): void {
        const index: number = this.requestList.indexOf(url);
        if (index !== -1) {
            this.requestList.splice(index, 1);
        }
    }

    private showLoader(): void {
        this.sharedConfiguration.pendingReq = true;
        if (this.sharedConfiguration.requests <= 1) {
            //this.loaderService.show();
        }
    }

    private hideLoader(): void {
        this.sharedConfiguration.pendingReq = false;
        if (this.sharedConfiguration.requests < 1) {
            //this.loaderService.hide();
        }
    }
}
