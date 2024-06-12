import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ISummaryLexicalSheet } from '../../../../app-models/dictionary.model';
import { SharedFunctions, SharedConfiguration } from '../../../../app-shared/services/config.service';
import { DictionaryService } from '../../../../app-shared/services/dictionary.service';
import { SharedLemmaComponentValues, ILexCases } from '../../../../app-shared/services/lemma.general.service';
import { RootSectionComponent } from '../../../../app-shared/shared-sections/root-section/root-section.component';
import { EtymologicalForLemmaComponent } from '../section.etymological.lemma/etymological-for-lemma.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FilterPipe } from '../../../../app-shared/pipe/FilterPipe';
import { DictionaryResultSectionComponent } from '../section.main.result/dictionary-result-section.component';
import { DResultmodalComponent } from '../section.result.details.modal/d-search-results.modal.component';

@Component({
  selector: 'd-result-detail',
  standalone: true,
  imports: [NgIf,NgClass,NgFor, FormsModule, CarouselModule,TabsModule ,FilterPipe, TranslateModule,RootSectionComponent,EtymologicalForLemmaComponent,DictionaryResultSectionComponent],
  templateUrl: './d-search-results.detail.component.html',
  styleUrls: ['./d-search-results.detail.component.scss']
})
export class DSearchResultsDetailComponent implements OnInit, OnChanges {

  @Input() lexId = 0;
  @Input() isAdvnSearch = false;
  @Input() selectedView = 0;
  @Input() showCitation = true;
  @Input() fromBookmark = false;
  @Input() hasLemmaEtymology = false;
  oldLexId = 0;
  bsModalRef?: BsModalRef;
  meaninglexicalSheetList: Array<ISummaryLexicalSheet> = [];
  newformlexicalSheetList: Array<ISummaryLexicalSheet> = [];
  fullLexicalSheetList: Array<ISummaryLexicalSheet> = [];
  @Output() removeLex = new EventEmitter<ISummaryLexicalSheet>();
  jumbToList = [];
  sortBy = 'dateSheet';

  constructor(private modalService: BsModalService
    , private _dictionaryService: DictionaryService
    , private _sharedFunctions: SharedFunctions
    , private _sharedLemmaComponentValues: SharedLemmaComponentValues
    , public _config: SharedConfiguration) { }

  ngOnInit() {

  }
  getSummaryLexicalSheets(id: number, type: string) {
    this.fullLexicalSheetList = [];
    this._dictionaryService.getSearchDetail(id, type, this.isAdvnSearch).subscribe(
      item => [this.afterRequestFininshed(item)]);
  }
  openModalWithComponent(data: ISummaryLexicalSheet, isQur: boolean) {
    const initialState = {
      lexItem: data,
      isQur: isQur
    };
    this.bsModalRef = this.modalService.show(DResultmodalComponent, { initialState, class: 'dictionary-modal' });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.lexId === this.oldLexId || !this.lexId) {
      return this.evHiddenState(changes);
    } else { (this.lexId && this.lexId !== this.oldLexId); }
    {
      this.oldLexId = this.lexId;
      this.getSummaryLexicalSheets(this.oldLexId, 'lemma');
      this.evHiddenState(changes);
    }
  }
  evHiddenState(changes: any) {
    if (!this.lexId || !changes.selectedView || (!changes.selectedView.previousValue && !changes.selectedView.currentValue)) {
      return;
    }

    const lexCas = this._sharedLemmaComponentValues.lexicalSheetList.filter(a => a.ID == this.lexId);
    if (lexCas.length == 0) {
      return;
    }

    const index = this._sharedLemmaComponentValues.lexicalSheetList.indexOf(lexCas[0]);

    this._sharedLemmaComponentValues.lexicalSheetList[index].hiddeLex = false;
    if (this.selectedView === 2 && this.meaninglexicalSheetList.filter(a => a.issemantic == true).length == 0) {
      this._sharedLemmaComponentValues.lexicalSheetList[index].hiddeLex = true;
    } else if (this.selectedView === 3 && this.newformlexicalSheetList.filter(a => a.isnewform == true).length == 0) {
      this._sharedLemmaComponentValues.lexicalSheetList[index].hiddeLex = true;
    }
  }

  afterRequestFininshed(data: Array<ISummaryLexicalSheet>): void {
    this.fullLexicalSheetList = data;
    /* 1.	يرجى عدم إظهار جذاذات المباني (جموع أو لغات) ضمن تسلسل جذاذات المعنى إذا كان إذا كانت حذاذة "مبنى فقط".*/
    /// const lexMeaning = this.fullLexicalSheetList.filter(item => item.ismeaning == true || item.issemantic == true);
    const lexMeaning = this.fullLexicalSheetList.filter(item => item.ismeaning == true);
    const lexNewForm = this.fullLexicalSheetList.filter(item => item.isnewform == true);
    this.meaninglexicalSheetList = this.sortAndReformateLexicalSheetList(lexMeaning);
    this.newformlexicalSheetList = this.sortAndReformateLexicalSheetList(lexNewForm);
    const lexCases: ILexCases = { lexId: this.lexId, MeaningCount: this.meaninglexicalSheetList.length, NewFormCount: this.newformlexicalSheetList.length, SemancticCount: this.meaninglexicalSheetList.filter(a => a.issemantic).length, Hidden: false };
    this._sharedLemmaComponentValues.ILexCasesList.push(lexCases);
  }

  sortAndReformateLexicalSheetList(fullLexicalSheetList: Array<ISummaryLexicalSheet>): Array<ISummaryLexicalSheet> {
    return <ISummaryLexicalSheet[]>this._sharedFunctions.reFormateSheetList(this._sharedFunctions.orderByArray(fullLexicalSheetList, this.sortBy), this._config.bookmarkType.lexicalsheet, this._config);
  }

  showNewForm(newFType: number, data: ISummaryLexicalSheet[]): boolean {
    let show = false;
    const q = data.filter(item => item.newformtype == newFType);
    show = (q.length > 0);
    return show;
  }


  removeBookmark(lexItem: ISummaryLexicalSheet) {
    /*if(lexItem.IsBookMark)
     return this.removeLex.next(lexItem);
    const index: number = this.meaninglexicalSheetList.indexOf(lexItem);
    if (index !== -1) {
        this.meaninglexicalSheetList.splice(index, 1);
    }
    if(this.meaninglexicalSheetList.length > 0)
      return;*/
    this.removeLex.next(lexItem);
  }

}
