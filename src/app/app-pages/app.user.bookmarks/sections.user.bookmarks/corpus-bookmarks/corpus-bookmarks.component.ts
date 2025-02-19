import { NgIf, NgClass, NgFor } from "@angular/common";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { summarycorpusmodel, corpussearchResponse } from "../../../../app-models/corpus.model";
import { BookmarkParmModel } from "../../../../app-models/user-bookmarks.models";
import { AccountService } from "../../../../app-shared/services/account.service";
import { SharedFunctions, SharedConfiguration } from "../../../../app-shared/services/config.service";
import { SharedCorpusComponentValues } from "../../../../app-shared/services/corpus.general.service";
import { CorpusService } from "../../../../app-shared/services/corpus.service";
import { PagerService } from "../../../../app-shared/services/pager.service";
import { BookmarksEmptyStateComponent } from "../bookmarks-empty-state/bookmarks-empty-state.component";
import { BookMarkService } from "../../../../app-shared/services/bookmark.service";


@Component({
  selector: 'corpus-bookmarks',
  standalone: true,
  imports: [ FormsModule,NgSelectModule,TranslateModule,NgIf,NgClass,NgFor,AccordionModule,BookmarksEmptyStateComponent],
  templateUrl: './corpus-bookmarks.component.html',
  styleUrls: ['./corpus-bookmarks.component.scss'],
  providers:[CorpusService,SharedCorpusComponentValues,BookMarkService]
})
export class CorpusBookmarksComponent implements OnInit {

  data: summarycorpusmodel[] = [];

  sourceType: number = 1;
  pageSizeList: number[] = [5, 10, 15, 20, 50, 100];
  public sortDropdownOptions:any[] = [];
  public selectedSortOption = 1;
  pageNumber = 1;
  pager: any = {};
  pSize: number = 10;
  public showTxt: boolean = true;
  isReady: boolean = false;
  @Output() LoadCounts = new EventEmitter();

  constructor(private _translate: TranslateService, private _shrdFunc: SharedFunctions, 
    private bookmarkService : BookMarkService,
    private _corpusService: CorpusService, public _config: SharedConfiguration, private _accountService: AccountService,
    private _pagerService: PagerService) { }


    ngOnInit() {
      this._translate.get(["dictionary.orderbydate", "dictionary.orderbyalph"]).subscribe(words => {
        this.sortDropdownOptions = [
          {
            text: words["dictionary.orderbyalph"],
            value: 1
          }, {
            text: words["dictionary.orderbydate"],
            value: 2
          }
        ];
      });
      this.onPrmChange(1);
    }

    onPrmChange(pageN = this.pageNumber): void {
      if (pageN && this.pageNumber !== pageN) {
        this.pageNumber = pageN;
      }
      var parm = new BookmarkParmModel();
      parm.Page = this.pageNumber;
      parm.PageSize = this.pSize;
      this._accountService.GetCorpusBookmarks(parm)
        .subscribe(searchResult => [this.succeededRequest(searchResult)],
          error => [this.errorOnRequest()]);
    }

    succeededRequest(searchResult: corpussearchResponse) {
      if (!searchResult || !searchResult.Data || searchResult.Data.length == 0)
        return this.errorOnRequest();
      this.setPager(searchResult.TotalCount);
      searchResult.Data.forEach(element => {
        element.IsBookMark = (this._config.UserBookmarkList.getValue().filter(a => a.bookmarktypeid == this._config.bookmarkType.sequence && a.saveditemid == element.ID).length > 0);
      });
      this.data = <summarycorpusmodel[]>this._shrdFunc.reFormateCorpusList(searchResult.Data);
      this.isReady = true;
    }

    errorOnRequest() {
      this.resetData();
    }

    resetData(): void {
      this.data = [];
      this.isReady = true;
      this.LoadCounts.next('');
    }

    onPageSizeChanged(page: number) {
      this.pSize = page;
      this.onPrmChange(1);
    }

    setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
      this.pageNumber = page;
      this.onPrmChange();
    }

    setPager(totalNumber: number) {
      // get pager object from service
      this.pager = this._pagerService.getPager(totalNumber, this.pageNumber, this.pSize);
    }

    ngOnDestroy(): void {
      this.data = [];
    }

    addBookmark(item: summarycorpusmodel) {
      this._corpusService.BookmarkAction(item).subscribe(res => this.afterBookmark(item));
    }

    afterBookmark(item: summarycorpusmodel) {
      this.bookmarkService.removeBookmarkLocal(item.ID,this._config.bookmarkType.sequence);
      const index: number = this.data.indexOf(item);
      if (index !== -1) {
        this.data.splice(index, 1);
        this.RefreshPageByBookmark();
      }
    }
    private RefreshPageByBookmark() {
      var currentPageNumber = this.pageNumber;
      if (currentPageNumber == this.pager.pages[this.pager.pages.length - 1] && this.data.length == 0)
        currentPageNumber = currentPageNumber == 1 ? currentPageNumber : (currentPageNumber - 1);
      this.setPage(currentPageNumber);
      this.LoadCounts.next('');
    }
    removeAllBookmark() {
      this._accountService.RemoveAllBookmarkByType(this._config.bookmarkType.sequence).subscribe(item => this.resetData());
    }

    ////////////// up & down //////////////////////

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
        this.data[index].isFirstSeqEnded = true;
      if (isNext)
        this.data[index].isLastSeqEnded = true;
      return;
    }
    var seqStr = this._shrdFunc.reWriteCorpusWithStyle(sequence.neighborContent);
    if (isNext == true) {
      this.data[index].neighborContentWithStyle += seqStr;
      this.data[index].lastSequence = sequence.sequenceId;
    }
    else {
      this.data[index].neighborContentWithStyle = seqStr + this.data[index].neighborContentWithStyle;
      this.data[index].firsSequence = sequence.sequenceId;
    }
  }

}
