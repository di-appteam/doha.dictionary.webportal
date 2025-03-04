
import { of, Subscription, Observable, Observer, EMPTY, noop, BehaviorSubject } from 'rxjs';
import { Component, AfterViewInit, OnInit, Input, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { catchError, mergeMap } from 'rxjs/operators';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'search-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TypeaheadModule,
    FormsModule,
    MatAutocompleteModule,
    TranslateModule,
    RouterLink,
    NgSelectModule, // This ensures ng-select is recognized
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
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
  public rootList: IRoot[] = [];
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
      observer.next(this._sharedLemmaComponentValues._searchDictionaryModel.getValue().SearchWord);
    }).pipe(
      mergeMap((token: string | undefined) => this.getAutoCompleteData(token ?? ''))

    );

  }

  ngOnInit(): void {
    this.GetRoots();
    if (!this._sharedLemmaComponentValues._searchDictionaryModel)
      this._sharedLemmaComponentValues._searchDictionaryModel = new BehaviorSubject<SearchDictionaryModel>(new SearchDictionaryModel());

    this._sharedConfiguration.AdditionalTags.subscribe(tags => { this.additionalTags = tags; });
    this._sharedConfiguration.SemanticList.subscribe(list => this.semanticList = list);
    this._sharedConfiguration.AutherList.subscribe(list => this.autherList = list);
    this._sharedConfiguration.SourceList.subscribe(list => this.sourceList = list);

    /*this.sub = this._sharedLemmaComponentValues._searchDictionaryModel.subscribe(
      (model : SearchDictionaryModel) => {
        if (model.SearchWord == '')
          this._sharedLemmaComponentValues._searchDictionaryModel = new BehaviorSubject<SearchDictionaryModel>(new SearchDictionaryModel());
        else{
        // Get the current value
        const model = this._sharedLemmaComponentValues._searchDictionaryModel.getValue();
        model.SearchWord = word;
        // Push the new value into BehaviorSubject to trigger change detection
        this._sharedLemmaComponentValues._searchDictionaryModel.next(model);
      });*/
    this._sharedConfiguration.pendingReq.subscribe(
      isPending => {
        this.pendingReq = isPending;
        this.cdr.detectChanges();
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


  /*getAutoCompleteData(event: any): Observable<ISummaryLexicalSheet[]> {
    if (event.key === "Enter") {
      this.parmChange();
      return EMPTY;
    }
    this._sharedLemmaComponentValues.acSummaryLexicalSheet = [];
    return this._dictionaryService.getAutoCompleteData(this._sharedLemmaComponentValues._searchDictionaryModel.getValue().SearchWord);
  }
  observableSource = (keyword: any): Observable<any[]> => {
    return of(this._sharedLemmaComponentValues.acSummaryLexicalSheet);
  }*/

    getAutoCompleteData(event: any): Observable<ISummaryLexicalSheet[]> {
    if (event.key === "Enter") {
      this.parmChange();
      return EMPTY;
    }
    const searchWord = this._sharedLemmaComponentValues._searchDictionaryModel.getValue().SearchWord;
  
    if (!searchWord || searchWord.length < 2 ) {
      return of([]); // ✅ Return empty array to prevent unnecessary API calls
    }
  
    return this._dictionaryService.SearchByLemmaAutoC(searchWord, 1, 10).pipe(
      map(response => response.Data || []), // ✅ Extracts `Data` or returns empty array
      catchError(() => of([])) // ✅ Handles API errors gracefully
    );
  }
  
  observableSource = (keyword: string): Observable<any[]> => {
    const searchWord = this._sharedLemmaComponentValues._searchDictionaryModel.getValue().SearchWord;
  
    if (!searchWord || searchWord.length < 2 ) {
      return of([]); // ✅ Return empty array to prevent unnecessary API calls
    }
  
    return this._dictionaryService.SearchByLemmaAutoC(searchWord, 1, 10).pipe(
      map(response => response.Data || []), // ✅ Extracts `Data` or returns empty array
      catchError(() => of([])) // ✅ Handles API errors gracefully
    );
  };

  autocompleListFormatter = (data: any): SafeHtml => {
    let html = `<span>${data.lemmaValue}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  parmChange(): void {
    this.PrepareSearchModel();
    if (this._sharedLemmaComponentValues._searchDictionaryModel.getValue().SearchWord && this._sharedLemmaComponentValues._searchDictionaryModel.getValue().SearchWord.length > 1) {
      this._sharedRootComponentValues.obsSearchWord.next('');
      if (this.isRoot === false && this._router.url.endsWith('/dictionary'))
        this._sharedLemmaComponentValues.fireSearchOperation.next(true);
      else {
        if (this._sharedLemmaComponentValues._searchDictionaryModel.getValue().IsAdvancedSearch)
          this._sharedLemmaComponentValues.fireSearchOperation.next(true);
        this._router.navigate([('/dictionary/' + this._sharedLemmaComponentValues._searchDictionaryModel.getValue().SearchWord)]);
      }
    }
  }
  PrepareSearchModel() {
    var model = this._sharedLemmaComponentValues._searchDictionaryModel.getValue();
    if (model.SearchWord["lemmaValue"])
      model.SearchWord = model.SearchWord["lemmaValue"];
    console.log(model.SearchWord);
    model.IsHijri = (this.selectedDateTypeDropdown == 1);
    model.DateFrom = this.dateFrom;
    model.DateTo = this.dateTo;
    console.log(model.IsAdvancedSearch);
    if (this.selectedItems)
      model.AutherValue = this.selectedItems.join(" , ");
    if (this.selectedDateTypeDropdown == 1) {
      if (this.selectedDateTypeHijriFromDropdown == 1 && model.DateFrom && model.DateFrom! > 0)
        model.DateFrom! *= -1;
      if (this.selectedDateTypeHijriToDropdown == 1 && model.DateTo && model.DateTo! > 0)
        model.DateTo! *= -1;
    }
    else {
      if (model.DateFrom && model.DateFrom! < 0)
        model.DateFrom! *= -1;
      if (model.DateTo && model.DateTo! < 0)
        model.DateTo! *= -1;
    }
    this._sharedLemmaComponentValues._searchDictionaryModel.next(model);
  }
  showAdvancedSearch() {
    var model = this._sharedLemmaComponentValues._searchDictionaryModel.getValue();
    model.IsAdvancedSearch = !model.IsAdvancedSearch;
    this._sharedLemmaComponentValues._searchDictionaryModel.next(model);
  }

  openSaveSearchCriteriaModal() {
    this.PrepareSearchModel();
    var model = this._sharedLemmaComponentValues._searchDictionaryModel.getValue();
    model.SearchCriteriaType = this._sharedConfiguration.bookmarkType.lexicalsheet;
    this._sharedLemmaComponentValues._searchDictionaryModel.next(model);
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
    if (this._sharedLemmaComponentValues._searchDictionaryModel.getValue().IsAdvancedSearch)
      this.showAdvancedSearch();
  }
  goToRoot() {
    this._sharedLemmaComponentValues.ResetSetting();
    var roots = this.rootList.filter((a: IRoot) => a.rootId == this.selectedRootId);
    if (!roots || roots.length == 0)
      return;
    this._sharedRootComponentValues.SelectRoot(roots[0], this._storeService);
    this._router.navigate(['/root/' + roots[0].rootValue]);
  }

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.rootValueUV.toLocaleLowerCase().indexOf(term) > -1 || item.rootValue.toLocaleLowerCase().indexOf(term) > -1 || item.rootValue.toLocaleLowerCase() === term || item.rootValueUV.toLocaleLowerCase() === term;
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

}

