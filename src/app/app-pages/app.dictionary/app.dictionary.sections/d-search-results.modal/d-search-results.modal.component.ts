import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ISummaryLexicalSheet } from '../../../../app-models/dictionary.model';
import { SharedConfiguration, SharedFunctions } from '../../../../app-shared/services/config.service';
import { RootSectionComponent } from '../../../../app-shared/shared-sections/root-section/root-section.component';

@Component({
  selector: '[modal-partial]',
  standalone: true,
  imports: [NgIf,NgClass,NgFor, FormsModule, CarouselModule, TranslateModule,RootSectionComponent],
  templateUrl: './d-search-results.modal.component.html',
  styleUrls: ['./d-search-results.modal.component.scss']
})
export class DResultmodalComponent implements OnInit {

  lexItem?: ISummaryLexicalSheet;
  isQur:boolean = false;

  constructor(public bsModalRef: BsModalRef, public _config: SharedConfiguration, public _sharedFunctions: SharedFunctions) { }

  ngOnInit() {
  }

}
