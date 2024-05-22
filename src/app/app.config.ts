import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
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
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(),provideAnimations(),
    importProvidersFrom(ModalModule.forRoot()),
    provideCharts(withDefaultRegisterables()),
    provideRouter(
      combinedRoutes,
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(withInterceptors([appInterceptor]), withFetch()),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
     }
  }))
 ]
};
