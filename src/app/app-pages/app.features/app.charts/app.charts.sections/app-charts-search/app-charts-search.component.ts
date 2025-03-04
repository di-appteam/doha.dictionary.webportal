import { NgIf, NgClass } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { EMPTY, Observable, Observer, of } from "rxjs";
import { ChartsSharedVariables, ChartsCustomModelExc } from "../../../../../app-models/charts.model";
import { ISummaryLexicalSheet } from "../../../../../app-models/dictionary.model";
import { AppChartsService } from "../../../../../app-shared/services/charts.service";
import { SharedConfiguration } from "../../../../../app-shared/services/config.service";
import { DictionaryService } from "../../../../../app-shared/services/dictionary.service";
import { mergeMap } from 'rxjs/operators';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";


@Component({
  selector: 'app-app-charts-search',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass,TranslateModule,ReactiveFormsModule, TypeaheadModule, MatAutocompleteModule,
    NgSelectModule],
  templateUrl: './app-charts-search.component.html',
  styleUrls: ['./app-charts-search.component.scss']
})
export class AppChartsSearchComponent implements OnInit {

  public SearchWord: string = "";
  lemmaId!: number;
  pendingReq: boolean = false;
  public acSummaryLexicalSheet: Array<ISummaryLexicalSheet> = [];
  dataSource?: Observable<ISummaryLexicalSheet[]>;
  typeaheadLoading?: boolean;
  public resourcesDropdownOptions : any = [];
  public selectedResourcesOption = 1;
  constructor(private _translate: TranslateService, private _appChartsService: AppChartsService,
    private cdr: ChangeDetectorRef, public _sharedConfiguration: SharedConfiguration, private _dictionaryService: DictionaryService, private _sanitizer: DomSanitizer, private _chartsSharedVariables: ChartsSharedVariables)
  {
    this.dataSource = new Observable((observer: Observer<string | undefined>) => {
      // Runs on every search
      observer.next(this.SearchWord);
    }).pipe(
      mergeMap((token: string | undefined) => this.getAutoCompleteData(token ?? ''))

    );


  }

  ngOnInit() {
    this._translate.get(["charts.dictionarystatistics", "charts.corpusstatistics"]).subscribe(words => {
      this.resourcesDropdownOptions = [
        {
          text: words["charts.dictionarystatistics"],
          value: 1
        },
        {
          text: words["charts.corpusstatistics"],
          value: 2
        }
      ];
    });

    this._sharedConfiguration.pendingReq.subscribe(
      isPending => {
        this.pendingReq = isPending;
        this.cdr.detectChanges();
      });

  }

  observableSource = (keyword: any): Observable<any[]> => {
    return of(this.acSummaryLexicalSheet);
  }
  autocompleListFormatter = (data: any): SafeHtml => {
    let html = `<span>${data.lemmaValue}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  getAutoCompleteData(event : any) : Observable<ISummaryLexicalSheet[]> {
      if (event.key === "Enter") {
        this.parmChange();
        return EMPTY;
      }
      this.acSummaryLexicalSheet = [];
      return this._dictionaryService.getAutoCompleteData(this.SearchWord);
  }

  customCallback(lemmaTxt:any) {
    var result = this.acSummaryLexicalSheet.filter(a => a.lemmaValue == lemmaTxt);
    if (result.length > 0) {
      this.lemmaId = result[0].lemmaId;
    }
  }
  parmChange(): void {
    if ((!this.lemmaId || this.lemmaId == 0) && (!this.SearchWord || this.SearchWord == "") && this.selectedResourcesOption == 2)
      return;
    this.acSummaryLexicalSheet = [];
    this._chartsSharedVariables.isLemmaReady = false;
    this._chartsSharedVariables.selectedResourcesOption = this.selectedResourcesOption;
    if (this.selectedResourcesOption == 1 && (!this.lemmaId || this.lemmaId == 0) && (!this.SearchWord || this.SearchWord == "")) {
      return this._chartsSharedVariables.obsAllStatFire.next(true);
    }
    else if (this.selectedResourcesOption == 1) {
      this._appChartsService.GetLemmaCountPerYears(this.lemmaId, 50, this.SearchWord)
        .subscribe(searchResult => [this.prepareLemmaChartData(searchResult)],
          error => []);
      return;
    }
    else if (this.selectedResourcesOption == 2) {
      this._appChartsService.GetCountsOfUsageLemmaPerYear(this.lemmaId, 50, this.SearchWord)
        .subscribe(searchResult => [this.prepareLemmaChartData(searchResult)],
          error => []);
    }
  }
  private prepareLemmaChartData(data: ChartsCustomModelExc[]): void {
    if (data.length > 0)
      this._chartsSharedVariables.obsLemmaResult.next(data);

  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

}
