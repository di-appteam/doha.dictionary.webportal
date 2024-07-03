import { isPlatformBrowser, NgIf } from '@angular/common';
import { APP_INITIALIZER, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, NO_ERRORS_SCHEMA, OnInit, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
import { StoreService } from './app-shared/services/store.service';
import { TranslationService } from './app-shared/services/translation.service';
import { AppFooterComponent } from './app-shared/shared-components/app-footer/app-footer.component';
import { AppHeaderComponent } from './app-shared/shared-components/app-header/app-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, TranslateModule, ReactiveFormsModule, NgIf, AppFooterComponent, AppHeaderComponent, HasPermissionDirective,],
  providers: [HasPermissionDirective, SharedConfiguration, TranslateService,
    SecurityService, ScrollService, PagerService, ClipboardService,
    StoreService, ChartControlService, SharedService, CacheService, DictionaryService, AccountService, SharedLemmaComponentValues,
    SharedRootComponentValues, AppChartsService, HttpService, ServiceUrlManager, SharedFunctions,AuthGuard
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppComponent implements OnInit {
  isAppStarted = false;
  isBrowser;
  constructor(private translateService: TranslationService, public securityService: SecurityService,
    @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.translateService.init();
    }
  }


  ngOnInit(): void {
    if (this.isBrowser) {
      this.securityService.StartUpApp().then(() => {
        this.isAppStarted = true;
      }).catch(error => {
        console.error('Startup failed', error);
        this.isAppStarted = false;
      });
    }
  }


}
