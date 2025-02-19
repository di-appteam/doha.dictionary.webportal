import { NgIf, NgClass, NgFor } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { summarydocuments, summarydocumentsResponse } from '../../../../app-models/bibliography.model';
import { BookmarkParmModel } from '../../../../app-models/user-bookmarks.models';
import { AccountService } from '../../../../app-shared/services/account.service';
import { BibliographyService } from '../../../../app-shared/services/bibliography.service';
import { SharedConfiguration } from '../../../../app-shared/services/config.service';
import { PagerService } from '../../../../app-shared/services/pager.service';
import { BookmarksEmptyStateComponent } from '../bookmarks-empty-state/bookmarks-empty-state.component';
import { BookMarkService } from '../../../../app-shared/services/bookmark.service';
import { ConfigJsonService } from '../../../../app-shared/services/configjson.service';

@Component({
  selector: 'bibliography-bookmarks',
  standalone: true,
  imports: [ FormsModule,NgSelectModule,TranslateModule,NgIf,NgClass,NgFor,BookmarksEmptyStateComponent],
  templateUrl: './bibliography-bookmarks.component.html',
  styleUrls: ['./bibliography-bookmarks.component.scss'],
  providers:[BibliographyService,BookMarkService,ConfigJsonService]
})
export class BibliographyBookmarksComponent implements OnInit {


  data: summarydocuments[] = [];

  sourceType: number = 1;
  pageSizeList: number[] = [5, 10, 15, 20, 50, 100];
  public sortDropdownOptions :any[] = [];
  public selectedSortOption = 1;
  pageNumber = 1;
  pager: any = {};
  pSize: number = 10;
  public showTxt: boolean = true;
  isReady: boolean = false;
  @Output() LoadCounts = new EventEmitter();



  constructor(private _translate: TranslateService, private _bibliographyService: BibliographyService, 
    private bookmarkService:BookMarkService,public configjsonService: ConfigJsonService,
    public _config: SharedConfiguration, private _accountService: AccountService,
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
    this._accountService.GetDocumentBookmarks(parm)
      .subscribe(searchResult => [this.succeededRequest(searchResult)],
        error => [this.errorOnRequest()]);
  }

  succeededRequest(searchResult: summarydocumentsResponse) {
    if (!searchResult || !searchResult.Data || searchResult.Data.length == 0)
      return this.errorOnRequest();
    this.setPager(searchResult.TotalCount);
    searchResult.Data.forEach(element => {
      element.IsBookMark = (this._config.UserBookmarkList.getValue().filter(a => a.bookmarktypeid == this._config.bookmarkType.reference && a.saveditemid == element.id).length > 0);
    });
    this.data = <summarydocuments[]>searchResult.Data;
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

  addBookmark(item: summarydocuments) {
    this._bibliographyService.BookmarkAction(item).subscribe(res => this.afterBookmark(item));
  }

  afterBookmark(item: summarydocuments) {
    this.bookmarkService.removeBookmarkLocal(item.id,this._config.bookmarkType.reference);
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
    this._accountService.RemoveAllBookmarkByType(this._config.bookmarkType.reference).subscribe(item => this.resetData());
  }


}
