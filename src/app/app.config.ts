import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideShareButtonsOptions, withConfig, SharerMethods } from 'ngx-sharebuttons';
import { shareIcons } from 'ngx-sharebuttons/icons';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

import { appInterceptor } from './app-shared/app-configurations/app.interceptor';
import { combinedRoutes } from './app.routes';
import { ConfigJsonService } from './app-shared/services/configjson.service';

// 🔄 Function to load config before app startup
export function loadConfigFactory(configService: ConfigJsonService) {
  return () => configService.loadConfig(); // Returns a promise
}

// 🌍 AoT requires an exported function for TranslateLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'https://www.dohadictionary.org/assets/lang/', '.json');
}

// 🛠️ Setup translation module
export const provideTranslation = () => ({
  defaultLanguage: 'ar',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

// 🚀 App configuration with initializer
export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withInterceptors([appInterceptor]), withFetch()),
    importProvidersFrom(ModalModule.forRoot()),
    provideCharts(withDefaultRegisterables()),
    provideRouter(combinedRoutes, withPreloading(PreloadAllModules)),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
    provideShareButtonsOptions(
      shareIcons(),
      withConfig({
        debug: true,
        sharerMethod: SharerMethods.Anchor,
      })
    ),
    // ✅ Ensure ConfigJsonService runs before the app starts
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigFactory,
      deps: [ConfigJsonService],
      multi: true, // Allows multiple initializers if needed
    },
  ],
};
