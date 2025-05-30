import { NgIf, NgClass } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { Subscription } from "rxjs";
import { LatestWordsSectionComponent } from "../app.dictionary.sections/section.latest.words/latest-words-section.component";
import { PrevSearchResultSectionComponent } from "../app.dictionary.sections/sectione.saved.search.words/prev-search-result-section.component";
import { TextFormComponent } from "../app.dictionary.sections/section.static.text/text-form.component";
import { RootsResultsComponent } from "./roots.results/roots-results.component";
import { DictionaryService } from "../../../../app-shared/services/dictionary.service";
import { SharedRootComponentValues } from "../../../../app-shared/services/root.general.service";
import { StoreService } from "../../../../app-shared/services/store.service";
import { DictionarySearchFormComponent } from "../../../../app-shared/shared-sections/dictionary-search-section/search-form.component";
import { SearchResults } from "../../app.bibliography/app.bibliography.sections/section.search.results/b-search-results.models";


@Component({
  selector: 'app-dictionary-root-details',
  standalone: true,
  templateUrl: './dictionary-root-details.component.html',
  styleUrls: ['./dictionary-root-details.component.scss'],
  imports: [FormsModule, NgIf, NgClass,
    NgSelectModule, TextFormComponent, DictionarySearchFormComponent, RootsResultsComponent,
     LatestWordsSectionComponent, PrevSearchResultSectionComponent]
})
export class DictionaryRootDetailsComponent implements OnInit, OnDestroy {


  public latestWordsArray: Array<any> = [];
  public searchResults?: SearchResults ;
  public showResult: boolean = false;
  private sub?: Subscription;

  constructor(
    private meta:Meta,
    public _sharedRootComponentValues: SharedRootComponentValues,
    private _route: ActivatedRoute,
    private _dictionaryService: DictionaryService,
    private _storeService: StoreService) {
      if (typeof window !== "undefined") {
      this.meta.updateTag({name: 'title',content: 'جذور المعجم'},"name='title'");
      this.meta.updateTag({name: 'og:title',content: 'جذور المعجم'},"name='og:title'");
      this.meta.updateTag({name: 'twitter:title',content: 'جذور المعجم'},"name='twitter:title'");
      this.meta.updateTag({name: 'description',content: 'تصفّح جميع مواد معجم الدوحة التاريخي للغة العربية، واستفد من خدمات البحث المتقدم في المداخل المعجمية والمصطلحات والنقوش والنظائر السامية.'},"name='description'");
      this.meta.updateTag({name: 'og:description',content: 'تصفّح جميع مواد معجم الدوحة التاريخي للغة العربية، واستفد من خدمات البحث المتقدم في المداخل المعجمية والمصطلحات والنقوش والنظائر السامية.'},"name='og:description'");
      this.meta.updateTag({name: 'twitter:description',content: 'تصفّح جميع مواد معجم الدوحة التاريخي للغة العربية، واستفد من خدمات البحث المتقدم في المداخل المعجمية والمصطلحات والنقوش والنظائر السامية.'},"name='twitter:description'");

    this.meta.updateTag({name: 'url',content: window.location.href},"name='url'");
    this.meta.updateTag({name: 'og:url',content: window.location.href},"name='og:url'");
    this.meta.updateTag({name: 'twitter:url',content: window.location.href},"name='twitter:url'");
    }
  }

  ngOnInit(): void {
    this.sub = this._route.params.subscribe(
      (params : any) => {
        if(params && params.word){
        var word = params.word.replace("-","/");
        if (word && word.length > 0 && word != '' && (!this._sharedRootComponentValues.selectedRoot || (this._sharedRootComponentValues.selectedRoot && this._sharedRootComponentValues.selectedRoot.rootValue != word))) {
          if (this._sharedRootComponentValues.AllRootList && this._sharedRootComponentValues.AllRootList.length > 0) {
            this.SetRoot(word);
          }
          this.GetRoots(word);
        }
        if (word && word.length > 0 && word != '')
          this._sharedRootComponentValues.obsSearchWord.next(word);
          if (typeof window !== "undefined") {
        this.meta.updateTag({name: 'title',content: ("مادة " + word)},"name='title'");
        this.meta.updateTag({name: 'og:title',content: ("مادة " + word)},"name='og:title'");
        this.meta.updateTag({name: 'twitter:title',content: ("مادة " + word)},"name='twitter:title'");
        this.meta.updateTag({name: 'url',content: window.location.href},"name='url'");
        this.meta.updateTag({name: 'og:url',content: window.location.href},"name='og:url'");
        this.meta.updateTag({name: 'twitter:url',content: window.location.href},"name='twitter:url'");


        this.meta.updateTag({ name: 'description', content: ("لا يكتفي معجم الدوحة التاريخي للغة العربية بتقديم المعاني المتعددة لكلمة " + word + "، إذ تجد مع كل معنى شواهد استخدام في التراث العربي، ادخل إلى صفحة كلمة " + word + " واكتشف تطور معانيها عبر الزمن" + word) }, "name='description'");
        this.meta.updateTag({ name: 'og:description', content: ("لا يكتفي معجم الدوحة التاريخي للغة العربية بتقديم المعاني المتعددة لكلمة " + word + "، إذ تجد مع كل معنى شواهد استخدام في التراث العربي، ادخل إلى صفحة كلمة " + word + " واكتشف تطور معانيها عبر الزمن" + word) }, "name='og:description'");
        this.meta.updateTag({ name: 'twitter:description', content: ("لا يكتفي معجم الدوحة التاريخي للغة العربية بتقديم المعاني المتعددة لكلمة " + word + "، إذ تجد مع كل معنى شواهد استخدام في التراث العربي، ادخل إلى صفحة كلمة " + word + " واكتشف تطور معانيها عبر الزمن" + word) }, "name='twitter'");
          }
      }
      });
  }

  private SetRoot(word:string) {
    var roots = this._sharedRootComponentValues.AllRootList.filter(a => a.rootValue.startsWith(word) || a.rootValueUV.startsWith(word) || a.rootValue.endsWith(("/ " + word)) || a.rootValueUV.endsWith(("/ " + word)) || a.rootValue.endsWith(("/" + word)) || a.rootValueUV.endsWith(("/" + word)));
    if (roots.length > 0) {
      this._sharedRootComponentValues.SelectRoot(roots[0], this._storeService);
    }
  }

  ngAfterViewInit(): void {
    //if (!this._sharedRootComponentValues.selectedRoot || this._sharedRootComponentValues.searchWord == '')
    //this._router.navigate(['/dictionary/']);
  }
  ngOnDestroy(): void {
    this._sharedRootComponentValues.ResetSetting();
  }

  private GetRoots(word:string) {
    this._dictionaryService.SearchInRoot("")
      .subscribe(searchResult => [this.SetRootList(searchResult, word)]);
  }
  private SetRootList(searchResult:any, word:string) {
    this._sharedRootComponentValues.AllRootList = searchResult.Data;
    this.SetRoot(word);
  }
}

