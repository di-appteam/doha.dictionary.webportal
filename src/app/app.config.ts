import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { combinedRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appInterceptor } from './app-shared/app-configurations/app.interceptor';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideShareButtonsOptions, withConfig, SharerMethods } from 'ngx-sharebuttons';
import { shareIcons, withIcons } from 'ngx-sharebuttons/icons';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

export const provideTranslation = () => ({
  defaultLanguage: 'ar',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withInterceptors([appInterceptor]), withFetch()),
    importProvidersFrom(ModalModule.forRoot()),
    provideCharts(withDefaultRegisterables()),
    provideRouter(
      combinedRoutes,
      withPreloading(PreloadAllModules)
    ),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
    provideShareButtonsOptions(
      shareIcons(),
      withConfig({
        debug: true,
        sharerMethod: SharerMethods.Anchor,
      })
    )
  ]
};
