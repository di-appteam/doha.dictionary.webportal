import { NgIf, NgClass, NgFor } from "@angular/common";
import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { SearchSDModel, summarycorpusmodel } from "../../../../app-models/corpus.model";
import { HasPermissionDirective } from "../../../../app-shared/directive/permissions.directive";
import { SharedFunctions } from "../../../../app-shared/services/config.service";
import { SharedCorpusComponentValues } from "../../../../app-shared/services/corpus.general.service";
import { CorpusService } from "../../../../app-shared/services/corpus.service";
import { PagerService } from "../../../../app-shared/services/pager.service";
import { AlertComponent } from "../../../../app-shared/shared-sections/alert/alert.component";
import { TextFormComponent } from "../section.text.form/text-form.component";
import { AlertEnum, AlertMessages, SORRY } from "./c-search-results.models";


@Component({
  selector: 'c-search-results',
  standalone: true,
  imports: [FormsModule, NgIf,NgFor, NgClass,TranslateModule,
    NgSelectModule, TextFormComponent,
    FontAwesomeModule,AlertComponent,
    AccordionModule,HasPermissionDirective],
  templateUrl: './c-search-results.component.html',
  styleUrls: ['./c-search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public searchModal!: SearchSDModel;
  public alertType!: AlertEnum;
  public alertMessage!: string;
  public alertErrorType = AlertEnum.ERROR;
  public showTxt : boolean = true;
  pageSizeList  = [
    {
      text: '5 بالصفحة',
      value: 5
    },
    {
      text: '10 بالصفحة',
      value: 10
    },
    {
      text: '15 بالصفحة',
      value: 15
    },
    {
      text: '20 بالصفحة',
      value: 20
    },
    {
      text: '50 بالصفحة',
      value: 50
    },
    {
      text: '100 بالصفحة',
      value: 100
    }
  ];
  pager: any = {};



  constructor(private _translate: TranslateService,
    public _sharedCorpusComponentValues: SharedCorpusComponentValues,
    private _pagerService: PagerService,
    private _corpusService: CorpusService,
    private _shrdFunc: SharedFunctions) { }


  ngOnInit() {
    this._sharedCorpusComponentValues.pNumber = 1;
    this._sharedCorpusComponentValues.TotalCount = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.searchModal || (!this.searchModal.searchWord && this.searchModal.SearchByLemmaId == false) || (this.searchModal.searchWord == '' && this.searchModal.SearchByLemmaId == false))
      return;
    this.showTxt = !this.searchModal.SearchByLemmaId;
    this.onPrmChange(1);
  }

  onPrmChange(pageN = this._sharedCorpusComponentValues.pNumber): void {
    this._corpusService.onPrmChange(pageN, this.searchModal).subscribe(searchResult => [this.succeededRequest(searchResult.Data, searchResult.TotalCount)],
      error => [this.errorOnRequest()]);
  }

  succeededRequest(data: summarycorpusmodel[], totalCount: number): void {
    this.showTxt = false;
    if (data.length == 0)
      return this.errorOnRequest();
    this._sharedCorpusComponentValues.TotalCount = totalCount;
    this._sharedCorpusComponentValues.corpusSearchResult = <summarycorpusmodel[]>this._shrdFunc.reFormateCorpusList(data);
    this.setPager(totalCount);
    this.alertType = AlertEnum.SUCCCESS;
    this.alertMessage = AlertMessages.SUCCCESS(totalCount);
  }

  errorOnRequest(): void {
    this.showTxt = false;
    this._corpusService.errorOnRequest();
    this.alertType = AlertEnum.ERROR;
    this.alertMessage = AlertMessages.ERROR(SORRY);
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.onPrmChange(page);
  }

  setPager(totalNumber: number) {
    // get pager object from service
    this.pager = this._pagerService.getPager(totalNumber, this._sharedCorpusComponentValues.pNumber, this.searchModal.pageSize);
  }

  getPrevSequence(sequence: summarycorpusmodel, index: number): void {
    if (!sequence.firsSequence)
      sequence.firsSequence = sequence.sequenceId;
    this._corpusService.getPrevSequence(sequence.firsSequence).subscribe(sequence => this.reWriteSequContaint(index, false, sequence),
      error => this.reWriteSequContaint(index, false));
  }

  getNextSequence(sequence: summarycorpusmodel, index: number): void {
    if (!sequence.lastSequence)
      sequence.lastSequence = sequence.sequenceId;
    this._corpusService.getNextSequence(sequence.lastSequence).subscribe(sequence => this.reWriteSequContaint(index, true, sequence),
      error => this.reWriteSequContaint(index, true));
  }

  reWriteSequContaint(index: number, isNext: boolean, sequence?: summarycorpusmodel) {
    if (!sequence) {
      if (!isNext)
        this._sharedCorpusComponentValues.corpusSearchResult[index].isFirstSeqEnded = true;
      if (isNext)
        this._sharedCorpusComponentValues.corpusSearchResult[index].isLastSeqEnded = true;
      return;
    }
    var seqStr = this._shrdFunc.reWriteCorpusWithStyle(sequence.neighborContent);
    if (isNext == true) {
      this._sharedCorpusComponentValues.corpusSearchResult[index].neighborContentWithStyle += seqStr;
      this._sharedCorpusComponentValues.corpusSearchResult[index].lastSequence = sequence.sequenceId;
    }
    else {
      this._sharedCorpusComponentValues.corpusSearchResult[index].neighborContentWithStyle = seqStr + this._sharedCorpusComponentValues.corpusSearchResult[index].neighborContentWithStyle;
      this._sharedCorpusComponentValues.corpusSearchResult[index].firsSequence = sequence.sequenceId;
    }
  }

  onPageSizeChanged(page: number) {
    this.searchModal.pageSize = page;
    this.onPrmChange(1);
  }
  ngOnDestroy(): void {
    this._sharedCorpusComponentValues.resetCorpusComponent();
  }


  addBookmark(item: summarycorpusmodel){
    this._corpusService.BookmarkAction(item).subscribe(res=> this.afterBookmark(item));
  }

  afterBookmark(item: summarycorpusmodel){
    item.IsBookMark = !item.IsBookMark;
  }

}
