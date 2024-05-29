import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom, isDevMode } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { combinedRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appInterceptor } from './app-shared/app-configurations/app.interceptor';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { SecurityService } from './app-shared/services/security.service';
import { HttpService } from './app-shared/security/requests/http.service';
import { SharedConfiguration } from './app-shared/services/config.service';
import { SharedService } from './app-shared/services/shared.service';
import { StoreService } from './app-shared/services/store.service';
import { ServiceUrlManager } from './app-shared/security/requests/serviceUrl.Manager';
import { CacheService } from './app-shared/services/cache.service';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(),provideAnimations(),
    provideHttpClient(withInterceptors([appInterceptor]), withFetch()),
  importProvidersFrom(ModalModule.forRoot()),
  provideCharts(withDefaultRegisterables()),
  provideRouter(
    combinedRoutes,
    withPreloading(PreloadAllModules)
  ),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
     }
  }))
 ]
};
