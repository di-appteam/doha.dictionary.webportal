import { isPlatformBrowser, NgIf } from '@angular/common';
import { APP_INITIALIZER, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, NO_ERRORS_SCHEMA, OnInit, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { RecaptchaSettings, RECAPTCHA_SETTINGS, RECAPTCHA_LANGUAGE } from 'ng-recaptcha-2';
import { HasPermissionDirective } from './app-shared/directive/permissions.directive';
import { AuthGuard } from './app-shared/security/auth.guard';
import { HttpService } from './app-shared/security/requests/http.service';
import { ServiceUrlManager } from './app-shared/security/requests/serviceUrl.Manager';
import { AccountService } from './app-shared/services/account.service';
import { CacheService } from './app-shared/services/cache.service';
import { AppChartsService } from './app-shared/services/charts.service';
import { ChartControlService } from './app-shared/services/chartscontrol.service';
import { ClipboardService } from './app-shared/services/Clipboard.service';
import { SharedConfiguration, SharedFunctions } from './app-shared/services/config.service';
import { DictionaryService } from './app-shared/services/dictionary.service';
import { SharedLemmaComponentValues } from './app-shared/services/lemma.general.service';
import { PagerService } from './app-shared/services/pager.service';
import { SharedRootComponentValues } from './app-shared/services/root.general.service';
import { ScrollService } from './app-shared/services/scroll.service';
import { SecurityService } from './app-shared/services/security.service';
import { SharedService } from './app-shared/services/shared.service';
import { ShowMessageServiceService } from './app-shared/services/showing-message.service';
import { StoreService } from './app-shared/services/store.service';
import { TranslationService } from './app-shared/services/translation.service';
import { AppFooterComponent } from './app-shared/shared-components/app-footer/app-footer.component';
import { AppHeaderOldVComponent } from './app-shared/shared-components/app-header-old-v/app-header-old-v.component';
import { AppHeaderComponent } from './app-shared/shared-components/app-header/app-header.component';
import { ScrollTopComponent } from './app-shared/shared-sections/scroll-top/scroll-top.component';
import { ConfigJsonService } from './app-shared/services/configjson.service';
import { HttpClient } from '@angular/common/http';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';


const globalSettings: RecaptchaSettings = { siteKey: '6LdwoXQbAAAAACVh9Zdh2wc6WDNYTh8ndZErKvSq', badge: 'inline' };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, TranslateModule, ReactiveFormsModule, ScrollTopComponent, AppHeaderOldVComponent,ModalModule,
    NgIf, AppFooterComponent, AppHeaderComponent, HasPermissionDirective,],
  providers: [HasPermissionDirective, SharedConfiguration, TranslateService, TranslationService, TranslateStore,
    SecurityService, ScrollService, PagerService, ClipboardService, ConfigJsonService,
    StoreService, ChartControlService, SharedService, CacheService, DictionaryService, AccountService, SharedLemmaComponentValues,BsModalService,
    SharedRootComponentValues, AppChartsService, HttpService, ServiceUrlManager, SharedFunctions, AuthGuard, ShowMessageServiceService, {
      provide: RECAPTCHA_SETTINGS,
      useValue: globalSettings
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'ar',
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppComponent implements OnInit {
  isAppStarted = false;
  isBrowser;
  constructor(
    private translateService: TranslateService, // ✅ Injecting TranslateService Correctly
    private securityService: SecurityService,
    public configStartupService: ConfigJsonService,
    private customTranslationService: TranslationService, // ✅ Inject Custom Translation Service
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.customTranslationService.init(); // ✅ Ensure Translation Loads on Startup
    }
  }

  async ngOnInit(): Promise<void> {
    if (this.isBrowser) {
      try {
        // ✅ Ensure config is loaded first
        await this.configStartupService.loadConfig();

        // ✅ Then start security service
        await this.securityService.StartUpApp();
        this.isAppStarted = true;
      } catch (error) {
        this.isAppStarted = false;
      }
    }
  }


}
