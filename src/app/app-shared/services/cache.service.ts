
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';



@Injectable()
export class CacheService {
    public CheckCashExists(ParamName:any, key:any) {
        if (ParamName != null) {
            this.clearDataCache(key);
        }
    }
    // add data cache
    public addDataCache(key:any, data:any) {
        // check if key and data has value
        if (!key || !data) { return; }
        // incase of data is an object then stringify it
        if (typeof data === 'object') {
            data = JSON.stringify(data);
        }
        // set key and data in Local Storage
        localStorage.setItem(key, data);
    }
    // get data cache
    public getDataCache(key:any): any {
        // get Value from local Storage
        let value = localStorage.getItem(key);
        // if doesnot exist then return
        if (!value) { return null; }
        // assume it is an object that has been stringified
        if (value[0] === '{' || value[0] === '[') {
            value = JSON.parse(value);
        }
        return value;
    }
    // clear data cache
    public clearDataCache(key:any) {
        // Remove local Storage Item
        localStorage.removeItem(key);
    }

    // add the token to the localstorage
    public addTicket(key:any, ticket:any) {
        this.addDataCache(key, ticket);
    }


    // get the token from the localstorage
    public getTicket(key:any) {
        return this.getDataCache(key);

    }

    // add data cache
    public addDataSessionCache(key:any, data:any) {
        // check if key and data has value
        if (!key || !data) { return; }
        // incase of data is an object then stringify it
        if (typeof data === 'object') {
            data = JSON.stringify(data);
        }
        // set key and data in Local Storage
        // localStorage.setItem(key, data);
        sessionStorage.setItem(key, data);
    }

    // clear session data cache
    public  clearDataSessionCache(key:any) {
        // Remove local Storage Item
        sessionStorage.removeItem(key);
    }

}
