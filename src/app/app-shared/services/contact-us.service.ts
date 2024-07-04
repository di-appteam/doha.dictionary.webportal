
import {throwError as observableThrowError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ServicesIDs } from '../collection/serviceurl.enum';
import { HttpService } from '../security/requests/http.service';
import { ServiceUrlManager } from '../security/requests/serviceUrl.Manager';
import { SharedConfiguration } from './config.service';
import { contactusmodel } from '../../app-models/contact-us.model';
import { SharedService } from './shared.service';

@Injectable()
export class ContactUsService {


    constructor(private _http: HttpService, private _config: SharedConfiguration, private _serviceUrlManager: ServiceUrlManager,private _sharedService : SharedService) {

    }

    SendContactUs(prm: contactusmodel) {
        if (this._config.userInfo && !this._config.validToken() )
          return this._sharedService.handleError('Server error');
        var srvURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.ContactUs);
        return this._http.post(srvURL, prm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
            map((response) => response));
    }

}
