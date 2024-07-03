import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { BookmarkCount } from '../../../app-models/user-account.model';
import { BookmarkType } from '../../../app-models/user-bookmarks.models';
import { BaseComponent } from '../../../app-shared/security/base.component';
import { AccountService } from '../../../app-shared/services/account.service';
import { SharedConfiguration } from '../../../app-shared/services/config.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgClass, NgIf } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { BibliographyBookmarksComponent } from '../sections.user.bookmarks/bibliography-bookmarks/bibliography-bookmarks.component';
import { CorpusBookmarksComponent } from '../sections.user.bookmarks/corpus-bookmarks/corpus-bookmarks.component';
import { DictionaryBookmarksComponent } from '../sections.user.bookmarks/dictionary-bookmarks/dictionary-bookmarks.component';
import { SearchCriteriaBookmarksComponent } from '../sections.user.bookmarks/search-criteria-bookmarks/search-criteria-bookmarks.component';
import { BookmarksEmptyStateComponent } from '../sections.user.bookmarks/bookmarks-empty-state/bookmarks-empty-state.component';
import { AuthGuard } from '../../../app-shared/security/auth.guard';
import { DictionarySearchFormComponent } from '../../../app-shared/shared-sections/dictionary-search-section/search-form.component';

@Component({
  selector: 'app-user-bookmarks',
  standalone: true,
  imports: [ FormsModule, CarouselModule,NgSelectModule,TranslateModule,NgIf,NgClass,DictionarySearchFormComponent,BibliographyBookmarksComponent,SearchCriteriaBookmarksComponent,CorpusBookmarksComponent,DictionaryBookmarksComponent,BookmarksEmptyStateComponent],
  templateUrl: './user-bookmarks.component.html',
  styleUrls: ['./user-bookmarks.component.scss']
})
export class UserBookmarksComponent extends BaseComponent implements OnInit {
  dictionarysearchmodel:any;
  public selectedBookmarkType: number = 2;
  public lexicalsheetCount: number = 0;
  public lemmaCount: number = 0;
  public referenceCount: number = 0;
  public sequenceCount: number = 0;
  public dictionarysearchmodelCount: number = 0;

  constructor(private meta : Meta,private _accountService: AccountService, public override _router: Router,
    public override _config: SharedConfiguration) {
    super(_router,_config);
    this.meta.updateTag({name: 'title',content: 'معجم الدوحة التاريخي للغة العربية'},"name='title'");
    this.meta.updateTag({name: 'og:title',content: 'معجم الدوحة التاريخي للغة العربية'},"name='og:title'");
    this.meta.updateTag({name: 'twitter:title',content: 'معجم الدوحة التاريخي للغة العربية'},"name='twitter:title'");
    this.meta.updateTag({name: 'description',content: 'معجم الدوحة التاريخي للغة العربية معجم يسجل تاريخ استعمالات ألفاظ اللغة العربية بدلالاتها الأولى، وتاريخ تحولاتها البنيوية والدلالية، مع تحديد مستعمليها، وتعزيز ذلك بالشواهد الموثقة.'},"name='description'");
    this.meta.updateTag({name: 'og:description',content: 'معجم الدوحة التاريخي للغة العربية معجم يسجل تاريخ استعمالات ألفاظ اللغة العربية بدلالاتها الأولى، وتاريخ تحولاتها البنيوية والدلالية، مع تحديد مستعمليها، وتعزيز ذلك بالشواهد الموثقة.'},"name='og:description'");
    this.meta.updateTag({name: 'twitter:description',content: 'معجم الدوحة التاريخي للغة العربية معجم يسجل تاريخ استعمالات ألفاظ اللغة العربية بدلالاتها الأولى، وتاريخ تحولاتها البنيوية والدلالية، مع تحديد مستعمليها، وتعزيز ذلك بالشواهد الموثقة.'},"name='twitter:description'");
    this.meta.updateTag({name: 'url',content: window.location.href},"name='url'");
    this.meta.updateTag({name: 'og:url',content: window.location.href},"name='og:url'");
    this.meta.updateTag({name: 'twitter:url',content: window.location.href},"name='twitter:url'");
  }

  ngOnInit() {
    this.LoadCounts();
  }

  LoadCounts(): void {
    this._accountService.GetBookmarkCount().subscribe(
      items => [this.PrepareResponse(items)]);
  }
  PrepareResponse(response: Array<BookmarkCount>) {
    this.lexicalsheetCount = this.GetBookmarkCountByType(BookmarkType.lexicalsheetID, response);
    this.lemmaCount = this.GetBookmarkCountByType(BookmarkType.lemmaID, response);
    this.referenceCount = this.GetBookmarkCountByType(BookmarkType.referenceID, response);
    this.sequenceCount = this.GetBookmarkCountByType(BookmarkType.sequenceID, response);
    this.dictionarysearchmodelCount = this.GetBookmarkCountByType(BookmarkType.dictionarysearchmodelID, response);
  }
  GetBookmarkCountByType(typeId:number,response: Array<BookmarkCount>): number {
    var countResult = response.filter(a => a.TypeId == typeId);
    if (!countResult || countResult.length == 0)
      return 0;
    return countResult[0].Count;
  }

  ChangeBookmarkType(selectedType: number) {
    this.selectedBookmarkType = selectedType;
  }

}
