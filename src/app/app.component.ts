import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { SharedService } from './app-shared/services/shared.service';
import { StoreService } from './app-shared/services/store.service';
import { TranslationService } from './app-shared/services/translation.service';
import { AppFooterComponent } from './app-shared/shared-components/app-footer/app-footer.component';
import { AppHeaderComponent } from './app-shared/shared-components/app-header/app-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule,AppFooterComponent,AppHeaderComponent,HasPermissionDirective],
  providers:[HasPermissionDirective,SharedConfiguration,
    StoreService,ChartControlService,SharedService,CacheService,DictionaryService,AccountService,SharedLemmaComponentValues,
    SharedRootComponentValues,AppChartsService,HttpService,ServiceUrlManager,SharedFunctions],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppComponent {
  title = 'dd-app';
  constructor(private translateService : TranslationService){
    this.translateService.init();
  }


}
