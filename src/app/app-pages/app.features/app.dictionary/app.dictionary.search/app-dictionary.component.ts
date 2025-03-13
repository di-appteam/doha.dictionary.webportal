import { NgClass, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { LatestWordsSectionComponent } from '../app.dictionary.sections/section.latest.words/latest-words-section.component';
import { PrevSearchResultSectionComponent } from '../app.dictionary.sections/sectione.saved.search.words/prev-search-result-section.component';
import { TextFormComponent } from '../app.dictionary.sections/section.static.text/text-form.component';
import { DSearchResultsComponent } from './dictionary.search.results/d-search-results.component';
import { SearchDictionaryModel } from '../../../../app-models/dictionary.model';
import { SharedLemmaComponentValues } from '../../../../app-shared/services/lemma.general.service';
import { SharedRootComponentValues } from '../../../../app-shared/services/root.general.service';
import { StoreService } from '../../../../app-shared/services/store.service';
import { DictionarySearchFormComponent } from '../../../../app-shared/shared-sections/dictionary-search-section/search-form.component';
import { SearchResults } from '../../app.bibliography/app.bibliography.sections/section.search.results/b-search-results.models';

@Component({
  selector: 'app-app-dictionary',
  standalone: true,
  templateUrl: './app-dictionary.component.html',
  styleUrl: './app-dictionary.component.scss',
  imports: [FormsModule, NgIf, NgClass,
    NgSelectModule, TextFormComponent, DictionarySearchFormComponent, DSearchResultsComponent,
     LatestWordsSectionComponent, PrevSearchResultSectionComponent]
})
export class AppDictionaryComponent implements AfterViewInit {


  public tagsSectionTitle: string = 'عمليات بحث سابقة';
  searchDictionaryModel: SearchDictionaryModel = new SearchDictionaryModel();


  public latestWordsArray: Array<any> = [];
  public searchResults?: SearchResults;

  private sub?: Subscription;
  private subLemmaSearch?: Subscription;
  public showResult: boolean = false;

  constructor(private _sharedLemmaComponentValues: SharedLemmaComponentValues
    , private _sharedRootComponentValues: SharedRootComponentValues
    ,private cdr: ChangeDetectorRef
    , private _route: ActivatedRoute
    , private meta: Meta,
    private _storeService: StoreService) {
    if (typeof window !== "undefined") {
      this.meta.updateTag({ name: 'title', content: 'البحث في المعجم' }, "name='title'");
      this.meta.updateTag({ name: 'og:title', content: 'البحث في المعجم' }, "name='og:title'");
      this.meta.updateTag({ name: 'twitter:title', content: 'البحث في المعجم' }, "name='twitter:title'");
      this.meta.updateTag({ name: 'description', content: 'تصفّح جميع مواد معجم الدوحة التاريخي للغة العربية، واستفد من خدمات البحث المتقدم في المداخل المعجمية والمصطلحات والنقوش والنظائر السامية.' }, "name='description'");
      this.meta.updateTag({ name: 'og:description', content: 'تصفّح جميع مواد معجم الدوحة التاريخي للغة العربية، واستفد من خدمات البحث المتقدم في المداخل المعجمية والمصطلحات والنقوش والنظائر السامية.' }, "name='og:description'");
      this.meta.updateTag({ name: 'twitter:description', content: 'تصفّح جميع مواد معجم الدوحة التاريخي للغة العربية، واستفد من خدمات البحث المتقدم في المداخل المعجمية والمصطلحات والنقوش والنظائر السامية.' }, "name='twitter:description'");
      this.meta.updateTag({ name: 'url', content: window.location.href }, "name='url'");
      this.meta.updateTag({ name: 'og:url', content: window.location.href }, "name='og:url'");
      this.meta.updateTag({ name: 'twitter:url', content: window.location.href }, "name='twitter:url'");
    }
  }

  ngAfterViewInit(): void {
    this.sub = this._route.params.subscribe(
      (params: any) => {
        this._sharedRootComponentValues.ResetSetting();
        if (params.word && params.word.length > 0 && params.word != '' && typeof window !== "undefined") {
          this.showResult = true;
          this.meta.updateTag({ name: 'title', content: ("البحث في المعجم بكلمة " + params.word) }, "name='title'");
          this.meta.updateTag({ name: 'og:title', content: ("البحث في المعجم بكلمة " + params.word) }, "name='og:title'");
          this.meta.updateTag({ name: 'twitter:title', content: ("البحث في المعجم بكلمة " + params.word) }, "name='twitter:title'");
          this.meta.updateTag({ name: 'description', content: ("لا يكتفي معجم الدوحة التاريخي للغة العربية بتقديم المعاني المتعددة لكلمة " + params.word + "، إذ تجد مع كل معنى شواهد استخدام في التراث العربي، ادخل إلى صفحة كلمة " + params.word + " واكتشف تطور معانيها عبر الزمن" + params.word) }, "name='description'");
          this.meta.updateTag({ name: 'og:description', content: ("لا يكتفي معجم الدوحة التاريخي للغة العربية بتقديم المعاني المتعددة لكلمة " + params.word + "، إذ تجد مع كل معنى شواهد استخدام في التراث العربي، ادخل إلى صفحة كلمة " + params.word + " واكتشف تطور معانيها عبر الزمن" + params.word) }, "name='og:description'");
          this.meta.updateTag({ name: 'twitter:description', content: ("لا يكتفي معجم الدوحة التاريخي للغة العربية بتقديم المعاني المتعددة لكلمة " + params.word + "، إذ تجد مع كل معنى شواهد استخدام في التراث العربي، ادخل إلى صفحة كلمة " + params.word + " واكتشف تطور معانيها عبر الزمن" + params.word) }, "name='twitter'");
          this.meta.updateTag({ name: 'url', content: window.location.href }, "name='url'");
          this.meta.updateTag({ name: 'og:url', content: window.location.href }, "name='og:url'");
          this.meta.updateTag({ name: 'twitter:url', content: window.location.href }, "name='twitter:url'");
          //this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord = params.word;
         var model = this._sharedLemmaComponentValues._searchDictionaryModel.getValue();
         model.SearchWord = params.word;
          this._sharedLemmaComponentValues._searchDictionaryModel.next(model);
          this._sharedLemmaComponentValues.fireSearchOperation.next(true);
        }
        else {
          //debugger;
          //this._sharedLemmaComponentValues.obsSearchWord.next("");
        }
        this.cdr.detectChanges();
      });
    this.subLemmaSearch = this._sharedLemmaComponentValues.fireSearchOperation.subscribe(
      run => {
        debugger;
        if(run){
        this.showResult = true;
        this.cdr.detectChanges();
        }
      });
  }


}
