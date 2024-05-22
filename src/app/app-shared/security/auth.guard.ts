import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard {

    constructor(private router: Router/*, private _cacheService: CacheService,
        private _sharedConfiguration: SharedConfiguration*/) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let hasPermission = false;

        /*if (this._sharedConfiguration.userInfo && this._sharedConfiguration.userInfo.Pages) {
            var pages = this._sharedConfiguration.userInfo.Pages.find(x => x.toUpperCase() === state.url.replace('/','').toUpperCase());
            hasPermission = pages != undefined ? (pages.length > 0) : false;
        }*/
        //if (hasPermission == true)
            return true;

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/']);
        return false;
    }
}
