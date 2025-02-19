import { NgIf, NgClass, NgFor } from "@angular/common";
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule } from "@ngx-translate/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SearchSDModel } from "../../../../app-models/corpus.model";
import { ISummaryLexicalSheet } from "../../../../app-models/dictionary.model";
import { BookmarkParmModel } from "../../../../app-models/user-bookmarks.models";
import { HasPermissionDirective } from "../../../../app-shared/directive/permissions.directive";
import { AccountService } from "../../../../app-shared/services/account.service";
import { SharedConfiguration, SharedFunctions } from "../../../../app-shared/services/config.service";
import { DictionaryService } from "../../../../app-shared/services/dictionary.service";
import { PagerService } from "../../../../app-shared/services/pager.service";
import { LemmaSequencesSectionComponent } from "../../../app.features/app.dictionary/app.dictionary.sections/section.lemma.sequences/lemma-sequences-section.component";
import { DSearchResultsDetailComponent } from "../../../app.features/app.dictionary/app.dictionary.sections/section.search.result.parent/d-search-results.detail.component";
import { BookmarksEmptyStateComponent } from "../bookmarks-empty-state/bookmarks-empty-state.component";
import { BookMarkService } from "../../../../app-shared/services/bookmark.service";

@Component({
  selector: 'dictionary-bookmarks',
  standalone:true,
  imports: [ FormsModule,NgSelectModule,TranslateModule,HasPermissionDirective,NgIf,NgClass,NgFor,RouterLink,AccordionModule,BookmarksEmptyStateComponent,DSearchResultsDetailComponent],
  templateUrl: './dictionary-bookmarks.component.html',
  styleUrls: ['./dictionary-bookmarks.component.scss'],
  providers:[DictionaryService,SharedConfiguration,BookMarkService]
})
export class DictionaryBookmarksComponent implements OnInit, OnChanges {

  @Input() BType: number = 1;
  public isReady: boolean = false;
  public selectedExpandOption: number = 1;
  public pageSizeDropdownOptions = [15, 20, 25];
  public selectedPageSizeOption = this.pageSizeDropdownOptions[0];
  public data: Array<ISummaryLexicalSheet> = [];
  seqModalRef!: BsModalRef;
  @Output() LoadCounts = new EventEmitter();

  resultTotalCount: number=0;
  resultPageSize: number = 10;
  pageNumber: number = 1;
  pager: any;
  pageSizeList: number[] = [5, 10, 20, 50, 100];
  public openActions: boolean = false;

  constructor(private _accountService: AccountService,
    private _dictionaryService: DictionaryService,
    private bookmarkService : BookMarkService,
    private _pagerService: PagerService,
    private modalService: BsModalService,
    public _config: SharedConfiguration,
    public _sharedFunctions: SharedFunctions) { }

  ngOnInit() {
    this.getSummaryLexicalSheets();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.BType)
      return;
    this.resultPageSize = 10;
    this.pageNumber = 1;
    this.openActions = false;
    this.data = [];
    this.isReady = false;
    this.getSummaryLexicalSheets();
  }

  toggleRowActions() {
    this.openActions = !this.openActions;
  }

  closeRowActions() {
    this.openActions = false;
  }

  openModalWithComponent(item:ISummaryLexicalSheet) {
    var searchModal = new SearchSDModel('', item.lemmaId,10);
    const initialState = {
      searchModal:searchModal,
      lemmaValue:item.lemmaValue
    };
    const config = {
      class:'modal-lg',
      initialState : initialState
    };
    this.seqModalRef = this.modalService.show(LemmaSequencesSectionComponent, config);
    this.seqModalRef.content.closeBtnName = 'Close';
  }

  getSummaryLexicalSheets() {
    var parm = new BookmarkParmModel();
    parm.TypeId = this.BType;
    parm.Page = this.pageNumber;
    parm.PageSize = this.resultPageSize;
    this._accountService.GetLexicalBookmark(parm).subscribe(
      item => [this.initComponent(item)]);
  }

  initComponent(searchResult:any): void {
    if (searchResult.Data || searchResult.TotalCount > 0) {
      this.setPager(searchResult.TotalCount)
      this.resultTotalCount = searchResult.TotalCount;
      this.data = <ISummaryLexicalSheet[]>this._sharedFunctions.reFormateSheetList(searchResult.Data, this.BType, this._config);
      this.isReady = true;
    } else {
      this.resetData();
    }
  }
  private resetData() {
    this.resultTotalCount = 0;
    this.data = [];
    this.LoadCounts.next('');
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pageNumber = page;
    this.getSummaryLexicalSheets();
  }
  setPager(totalNumber: number) {
    // get pager object from service
    this.pager = this._pagerService.getPager(totalNumber, this.pageNumber, this.resultPageSize);
  }

  public reWriteDateSheet(date: number, isDeathDate: boolean): string {
    return this._sharedFunctions.reWriteDateSheet(date, isDeathDate);
  }

  pageSizeChanged(parmPageSize: any): void {
    if (parmPageSize == this.resultPageSize)
      return;
    this.resultPageSize = parmPageSize;
    this.getSummaryLexicalSheets();
  }
  openlexical(item: ISummaryLexicalSheet): void {
    item.parmId = item.ID;
  }

  addBookmark(lexItem: ISummaryLexicalSheet) {
    this._dictionaryService.BookmarkAction(this._config.bookmarkType.lemma, lexItem).subscribe(item => this.refreshLex(lexItem));
  }

  refreshLex(lexItem: ISummaryLexicalSheet) {
    const index: number = this.data.indexOf(lexItem);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.bookmarkService.removeBookmarkLocal(lexItem.ID,this.BType);
      this.RefreshPageByBookmark();
    }
  }


  removeAllBookmark() {
    this._accountService.RemoveAllBookmarkByType(this.BType).subscribe(item => this.resetData());
  }


  removeLex(lexItem: ISummaryLexicalSheet) {
    if(lexItem.IsBookMark == true || this.BType == this._config.bookmarkType.lemma)
     return this.LoadCounts.next('');
    if (!lexItem)
      return;
    var orgLexItem = this.data.filter(a => a.ID == lexItem.ID);
    if (orgLexItem.length == 0)
      return;
    this.refreshLex(orgLexItem[0]);
  }
  private RefreshPageByBookmark(){
    var currentPageNumber = this.pageNumber;
    if (currentPageNumber == this.pager.pages[this.pager.pages.length - 1] && this.data.length == 0)
      currentPageNumber = currentPageNumber == 1 ? currentPageNumber : (currentPageNumber  - 1);
    this.setPage(currentPageNumber);
    this.LoadCounts.next('');
  }

  // Treat the instructor name as the unique identifier for the object
  trackByID(index:number, item: ISummaryLexicalSheet) {
    return item.ID;
  }
}
