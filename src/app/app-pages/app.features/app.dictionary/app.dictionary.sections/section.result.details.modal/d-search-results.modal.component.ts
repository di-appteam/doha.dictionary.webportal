import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ISummaryLexicalSheet } from '../../../../../app-models/dictionary.model';
import { HttpService } from '../../../../../app-shared/security/requests/http.service';
import { ServiceUrlManager } from '../../../../../app-shared/security/requests/serviceUrl.Manager';
import { AccountService } from '../../../../../app-shared/services/account.service';
import { CacheService } from '../../../../../app-shared/services/cache.service';
import { ClipboardService } from '../../../../../app-shared/services/Clipboard.service';
import { SharedConfiguration, SharedFunctions } from '../../../../../app-shared/services/config.service';
import { DictionaryService } from '../../../../../app-shared/services/dictionary.service';
import { SharedService } from '../../../../../app-shared/services/shared.service';
import { StoreService } from '../../../../../app-shared/services/store.service';
import { RootSectionComponent } from '../../../../../app-shared/shared-sections/root-section/root-section.component';
import { DictionaryResultSectionComponent } from '../section.main.result/dictionary-result-section.component';

@Component({
  selector: '[modal-partial]',
  standalone: true,
  imports: [NgIf,NgClass,NgFor, FormsModule, CarouselModule, TranslateModule,RootSectionComponent,DictionaryResultSectionComponent],
  templateUrl: './d-search-results.modal.component.html',
  styleUrls: ['./d-search-results.modal.component.scss'],
  providers:[SharedConfiguration,SharedFunctions,DictionaryService,HttpService,AccountService,ClipboardService,CacheService,SharedService,ServiceUrlManager,StoreService]
})
export class DResultmodalComponent implements OnInit {

  lexItem?: ISummaryLexicalSheet;
  isQur:boolean = false;

  constructor(public bsModalRef: BsModalRef, public _config: SharedConfiguration, public _sharedFunctions: SharedFunctions) {     

  }

  ngOnInit() {
    console.log('LexItem:', this.lexItem); // ✅ Ensures data is properly initialized
    console.log('IsQur:', this.isQur);
    
  }

}
