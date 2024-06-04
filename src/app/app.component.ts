import { NgIf } from '@angular/common';
import { APP_INITIALIZER, Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HasPermissionDirective } from './app-shared/directive/permissions.directive';
import { HttpService } from './app-shared/security/requests/http.service';
import { ServiceUrlManager } from './app-shared/security/requests/serviceUrl.Manager';
import { AccountService } from './app-shared/services/account.service';
import { CacheService } from './app-shared/services/cache.service';
import { AppChartsService } from './app-shared/services/charts.service';
import { ChartControlService } from './app-shared/services/chartscontrol.service';
import { SharedConfiguration, SharedFunctions } from './app-shared/services/config.service';
import { DictionaryService } from './app-shared/services/dictionary.service';
import { SharedLemmaComponentValues } from './app-shared/services/lemma.general.service';
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
  imports: [RouterOutlet, RouterModule,ReactiveFormsModule,NgIf,AppFooterComponent,AppHeaderComponent,HasPermissionDirective],
  providers:[HasPermissionDirective,SharedConfiguration,
    SecurityService,ScrollService,
    StoreService,ChartControlService,SharedService,CacheService,DictionaryService,AccountService,SharedLemmaComponentValues,
    SharedRootComponentValues,AppChartsService,HttpService,ServiceUrlManager,SharedFunctions
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppComponent implements OnInit {
  isAppStarted = false;
  title = 'dd-app';
  constructor(private translateService : TranslationService, public securityService: SecurityService){
    this.translateService.init();
  }


  ngOnInit(): void {
    this.securityService.StartUpApp().then(() => {
      this.isAppStarted = true;
    }).catch(error => {
      console.error('Startup failed', error);
      this.isAppStarted = false;
    });
  }


}
