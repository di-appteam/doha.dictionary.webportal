
import { of, Subscription, Observable, Observer, EMPTY, noop } from 'rxjs';
import { Component, AfterViewInit, OnInit, Input, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IRoot, ISearchByLemmaResultResponse, ISummaryLexicalSheet, SearchDictionaryModel } from '../../../app-models/dictionary.model';
import { SharedConfiguration } from '../../services/config.service';
import { DictionaryService } from '../../services/dictionary.service';
import { SharedLemmaComponentValues } from '../../services/lemma.general.service';
import { SharedRootComponentValues } from '../../services/root.general.service';
import { StoreService } from '../../services/store.service';
import { SaveSearchCriteriaComponent } from '../save-search-criteria/save-search-criteria.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { mergeMap } from 'rxjs/operators';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TypeaheadModule, FormsModule, MatAutocompleteModule, TranslateModule, RouterLink, NgSelectModule, MatFormFieldModule,
    MatInputModule],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class DictionarySearchFormComponent implements OnInit, AfterViewInit {
  searchControl = new FormControl();
  dataSource?: Observable<ISummaryLexicalSheet[]>;
  options: any[] = [];  // Replace with your actual options type
  @Input() isRoot: boolean = false;
  pendingReq: boolean = false;
  public selectedItems: any;
  additionalTags: any[] = [];
  semanticList: any[] = [];
  autherList: any[] = [];
  sourceList: any[] = [];
  public rootList = [];
  public advancedSearch: boolean = false;
  public autoComp: boolean = true;
  private sub?: Subscription;
  private subBMSearch?: Subscription;
  private parmAutoCom?: Subscription;
  filteredOptions?: Observable<any[]>;  // Replace with your actual options type
  public dropdownTaqwemOptions = [
    {
      text: "هجري",
      value: 1
    }, {
      text: "ميلادي",
      value: 2
    }];
  public dateTypeDropdownHijriOptions = [
    {
      text: "ق",
      value: 1
    },
    {
      text: "هـ",
      value: 2
    }
  ];
  public selectedOption: number = 1;
  public selectedRootId?: number;
  public selectedDateTypeDropdown = 1;
  public selectedDateTypeHijriFromDropdown = 1;
  public selectedDateTypeHijriToDropdown = 1;
  public selectedDateDropdown = 1;
  public dateFrom: any;
  public dateTo: any;
  saveModalRef?: BsModalRef;
  typeaheadLoading?: boolean;

  constructor(
    private _dictionaryService: DictionaryService,
    public _sharedLemmaComponentValues: SharedLemmaComponentValues,
    public _sharedRootComponentValues: SharedRootComponentValues,
    public _sharedConfiguration: SharedConfiguration,
    private modalService: BsModalService,
    private _router: Router,
    private _storeService: StoreService,
    private cdr: ChangeDetectorRef,
    private _sanitizer: DomSanitizer) {

    this.dataSource = new Observable((observer: Observer<string | undefined>) => {
      // Runs on every search
      observer.next(this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord);
    }).pipe(
      mergeMap((token: string) => this.getAutoCompleteData(token))
    );

  }

  ngOnInit(): void {
    this.GetRoots();
    if (!this._sharedLemmaComponentValues._searchDictionaryModel)
      this._sharedLemmaComponentValues._searchDictionaryModel = new SearchDictionaryModel();

    this._sharedConfiguration.AdditionalTags.subscribe(tags => { this.additionalTags = tags; });
    this._sharedConfiguration.SemanticList.subscribe(list => this.semanticList = list);
    this._sharedConfiguration.AutherList.subscribe(list => this.autherList = list);
    this._sharedConfiguration.SourceList.subscribe(list => this.sourceList = list);

    this.sub = this._sharedLemmaComponentValues.obsSearchWord.subscribe(
      word => {
        if (word == '')
          this._sharedLemmaComponentValues._searchDictionaryModel = new SearchDictionaryModel();
        this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord = word;
      });
    this._sharedConfiguration.pendingReq.subscribe(
      isPending => {
        this.pendingReq = isPending;
        this.cdr.detectChanges();
      });

    this.subBMSearch = this._sharedLemmaComponentValues.obsCtrSearchFromBM.subscribe(
      searchItem => {
        if (searchItem) {
          this._sharedLemmaComponentValues._searchDictionaryModel = searchItem;
          this.selectedDateTypeDropdown = this._sharedLemmaComponentValues._searchDictionaryModel.IsHijri ? 1 : 2;
          let dateFrom = this._sharedLemmaComponentValues._searchDictionaryModel.DateFrom ?? -1;
          let DateTo = this._sharedLemmaComponentValues._searchDictionaryModel.DateTo ?? -1;
          this.selectedDateTypeHijriFromDropdown = dateFrom < 0 ? 1 : 2;
          this.selectedDateTypeHijriToDropdown = DateTo < 0 ? 1 : 2;
          this.dateFrom = dateFrom < 0 ? (dateFrom * -1) : dateFrom;
          this.dateTo = DateTo < 0 ? (DateTo * -1) : DateTo;
          this.parmChange();
        }
      });
  }

  private GetRoots() {
    this._dictionaryService.SearchInRoot("", 0)
      .subscribe(searchResult => [this.SetRootList(searchResult)]);
  }

  private SetRootList(searchResult: any) {
    this._sharedRootComponentValues.AllRootList = searchResult.Data;
    return this.rootList = searchResult.Data.filter((a: IRoot) => a.issplitted == 1);
  }


  ngAfterViewInit(): void {
  }


  getAutoCompleteData(event: any): Observable<ISummaryLexicalSheet[]> {
    if (event.key === "Enter") {
      this.parmChange();
      return EMPTY;
    }
    this._sharedLemmaComponentValues.acSummaryLexicalSheet = [];
    if (this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord == undefined || this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord.length < 2) {
      return EMPTY;
    }
    return this._dictionaryService.SearchByLemmaAutoC(this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord, 1, 10).pipe(
      map((data: ISearchByLemmaResultResponse) => data && data.Data || [])
    );
  }
  observableSource = (keyword: any): Observable<any[]> => {
    return of(this._sharedLemmaComponentValues.acSummaryLexicalSheet);
  }
  autocompleListFormatter = (data: any): SafeHtml => {
    let html = `<span>${data.lemmaValue}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  parmChange(): void {
    this.PrepareSearchModel();
    if (this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord && this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord.length > 1) {
      this._sharedRootComponentValues.obsSearchWord.next('');
      if (this.isRoot === false && this._router.url.endsWith('/dictionary'))
        this._sharedLemmaComponentValues.obsCtrSearch.next(this._sharedLemmaComponentValues._searchDictionaryModel);
      else {
        if (this._sharedLemmaComponentValues._searchDictionaryModel.IsAdvancedSearch)
          this._sharedLemmaComponentValues.obsCtrSearch.next(this._sharedLemmaComponentValues._searchDictionaryModel);
        this._router.navigate([('/dictionary/' + this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord)]);
      }
    }
  }
  PrepareSearchModel() {
    if (this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord["lemmaValue"])
      this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord = this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord["lemmaValue"];
    console.log(this._sharedLemmaComponentValues._searchDictionaryModel.SearchWord);
    this._sharedLemmaComponentValues._searchDictionaryModel.IsHijri = (this.selectedDateTypeDropdown == 1);
    this._sharedLemmaComponentValues._searchDictionaryModel.DateFrom = this.dateFrom;
    this._sharedLemmaComponentValues._searchDictionaryModel.DateTo = this.dateTo;
    console.log(this._sharedLemmaComponentValues._searchDictionaryModel.IsAdvancedSearch);
    if (this.selectedItems)
      this._sharedLemmaComponentValues._searchDictionaryModel.AutherValue = this.selectedItems.join(" , ");
    if (this.selectedDateTypeDropdown == 1) {
      if (this.selectedDateTypeHijriFromDropdown == 1 && this._sharedLemmaComponentValues._searchDictionaryModel.DateFrom && this._sharedLemmaComponentValues._searchDictionaryModel.DateFrom > 0)
        this._sharedLemmaComponentValues._searchDictionaryModel.DateFrom *= -1;
      if (this.selectedDateTypeHijriToDropdown == 1 && this._sharedLemmaComponentValues._searchDictionaryModel.DateTo && this._sharedLemmaComponentValues._searchDictionaryModel.DateTo > 0)
        this._sharedLemmaComponentValues._searchDictionaryModel.DateTo *= -1;
    }
    else {
      if (this._sharedLemmaComponentValues._searchDictionaryModel.DateFrom && this._sharedLemmaComponentValues._searchDictionaryModel.DateFrom < 0)
        this._sharedLemmaComponentValues._searchDictionaryModel.DateFrom *= -1;
      if (this._sharedLemmaComponentValues._searchDictionaryModel.DateTo && this._sharedLemmaComponentValues._searchDictionaryModel.DateTo < 0)
        this._sharedLemmaComponentValues._searchDictionaryModel.DateTo *= -1;
    }

  }
  showAdvancedSearch() {
    this._sharedLemmaComponentValues._searchDictionaryModel.IsAdvancedSearch = !this._sharedLemmaComponentValues._searchDictionaryModel.IsAdvancedSearch;
  }

  openSaveSearchCriteriaModal() {
    this.PrepareSearchModel();
    this._sharedLemmaComponentValues._searchDictionaryModel.SearchCriteriaType = this._sharedConfiguration.bookmarkType.lexicalsheet;
    const initialState = {
      searchCriteria: JSON.stringify(this._sharedLemmaComponentValues._searchDictionaryModel)
    };
    const config = {
      class: 'modal-sm',
      initialState: initialState
    };
    this.saveModalRef = this.modalService.show(SaveSearchCriteriaComponent, config);
    this.saveModalRef.content.closeBtnName = 'Close';
  }

  setSelectedRoot(newVal: any): void {
    this.selectedRootId = !newVal ? undefined : newVal;
    if (this._sharedLemmaComponentValues._searchDictionaryModel.IsAdvancedSearch)
      this.showAdvancedSearch();
  }
  goToRoot() {
    var roots = this.rootList.filter((a: IRoot) => a.rootId == this.selectedRootId);
    if (!roots || roots.length == 0)
      return;
    this._sharedRootComponentValues.SelectRoot(roots[0], this._storeService);
    this._router.navigate(['/root/']);
  }

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.rootValueUV.toLocaleLowerCase().indexOf(term) > -1 || item.rootValue.toLocaleLowerCase().indexOf(term) > -1 || item.rootValue.toLocaleLowerCase() === term || item.rootValueUV.toLocaleLowerCase() === term;
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

}

