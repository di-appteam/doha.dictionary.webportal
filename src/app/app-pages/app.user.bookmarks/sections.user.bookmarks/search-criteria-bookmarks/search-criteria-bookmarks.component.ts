
import { NgIf, NgClass, NgFor } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SearchDictionaryModel } from '../../../../app-models/dictionary.model';
import { userbookmarks, userbookmarksResponse } from '../../../../app-models/user-account.model';
import { BookmarkParmModel } from '../../../../app-models/user-bookmarks.models';
import { AccountService } from '../../../../app-shared/services/account.service';
import { BibliographyService } from '../../../../app-shared/services/bibliography.service';
import { SharedConfiguration } from '../../../../app-shared/services/config.service';
import { SharedLemmaComponentValues } from '../../../../app-shared/services/lemma.general.service';
import { PagerService } from '../../../../app-shared/services/pager.service';
import { BookmarksEmptyStateComponent } from '../bookmarks-empty-state/bookmarks-empty-state.component';

@Component({
  selector: 'search-criteria-bookmarks',
  standalone:true,
  imports: [ FormsModule,NgSelectModule,TranslateModule,NgIf,NgFor,NgClass,AccordionModule,BookmarksEmptyStateComponent],
  templateUrl: './search-criteria-bookmarks.component.html',
  styleUrls: ['./search-criteria-bookmarks.component.scss']
})
export class SearchCriteriaBookmarksComponent implements OnInit {


  data: userbookmarks[] = [];

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



  constructor(private _translate: TranslateService, private _router: Router, private _sharedLemmaComponentValues: SharedLemmaComponentValues, public _config: SharedConfiguration, private _accountService: AccountService,
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
    this._accountService.GetSearchCriteriaBookmarks(parm)
      .subscribe(searchResult => [this.succeededRequest(searchResult)],
        error => [this.errorOnRequest()]);
  }

  succeededRequest(searchResult: userbookmarksResponse) {
    if (!searchResult || !searchResult.Data || searchResult.Data.length == 0)
      return this.errorOnRequest();
    this.setPager(searchResult.TotalCount);
    searchResult.Data.forEach(element => {
      this.reWriteDisplayData(element);
    });
    this.data = <userbookmarks[]>searchResult.Data;
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

  RemoveBookmark(item: userbookmarks) {
    //Remove bookmark
    this._accountService.AddBookmark(item, false).subscribe(res => this.afterBookmark(item));
  }

  SearchInDictioanry(item: userbookmarks) {
     var searchDictionaryModel = <SearchDictionaryModel>JSON.parse(item.searchcriterias);
     this._router.navigate([('/dictionary/')]);
     this._sharedLemmaComponentValues._searchDictionaryModel.next(searchDictionaryModel);
    //setTimeout(() => {this._sharedLemmaComponentValues.fireSearchOperation.next(true)});
  }

  afterBookmark(item: userbookmarks) {
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
    this._accountService.RemoveAllBookmarkByType(this._config.bookmarkType.dictionarysearchmodel).subscribe(item => this.resetData());
  }

  reWriteDisplayData(item: userbookmarks) {
    var str = "[";
    var searchModal = <SearchDictionaryModel>JSON.parse(item.searchcriterias);
    if (searchModal.SearchWord)
      str += "كلمة البحث : " + searchModal.SearchWord;
    if (searchModal.DateFrom) {
      str += (str.length > 0 ? " - " : "") + " من : " + (searchModal.DateFrom < 0 ? ((searchModal.DateFrom * -1)) : searchModal.DateFrom);
      if (searchModal.DateFrom < 0)
        str += " ق هـ ";
      else
        str += (searchModal.IsHijri ? " هـ " : " م ");
    }
    if (searchModal.DateTo) {
      str += (str.length > 0 ? " - " : "") + " إلى : " + (searchModal.DateTo < 0 ? (searchModal.DateTo * -1) : searchModal.DateTo);
      if (searchModal.DateTo < 0)
        str += " ق هـ ";
      else
        str += (searchModal.IsHijri ? " هـ " : " م ");
    }
    if (searchModal.SemanticFieldValue)
      str += (str.length > 0 ? " - " : "") + "التخصص : " + searchModal.SemanticFieldValue;
    if (searchModal.AdditioalTag)
      str += (str.length > 0 ? " - " : "") + "الوسم : " + searchModal.AdditioalTag;
    if (searchModal.IsCarving)
      str += (str.length > 0 ? " - " : "") + "الجذر له نقوش ";
    if (searchModal.IsEtymological)
      str += (str.length > 0 ? " - " : "") + "الجذر له نظائر سامية ";
    if (searchModal.IsSemanticField)
      str += (str.length > 0 ? " - " : "") + "مصطلحات فقط";
    str += "]";
    item.displaydata = str;
  }

}
