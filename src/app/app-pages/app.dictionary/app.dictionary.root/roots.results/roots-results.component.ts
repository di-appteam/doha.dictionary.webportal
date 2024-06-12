import { NgIf, NgClass, NgFor } from "@angular/common";
import { Component, OnInit, OnChanges, Input, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule } from "@ngx-translate/core";
import { IRoot } from "../../../../app-models/dictionary.model";
import { AccountService } from "../../../../app-shared/services/account.service";
import { SharedConfiguration } from "../../../../app-shared/services/config.service";
import { SharedLemmaComponentValues } from "../../../../app-shared/services/lemma.general.service";
import { SharedRootComponentValues } from "../../../../app-shared/services/root.general.service";
import { StoreService } from "../../../../app-shared/services/store.service";
import { DictionarySearchFormComponent } from "../../../../app-shared/shared-sections/dictionary-search-section/search-form.component";
import { DSearchResultsComponent } from "../../app.dictionary.search/dictionary.search.results/d-search-results.component";
import { LatestWordsSectionComponent } from "../../app.dictionary.sections/section.latest.words/latest-words-section.component";
import { PrevSearchResultSectionComponent } from "../../app.dictionary.sections/sectione.saved.search.words/prev-search-result-section.component";
import { TextFormComponent } from "../../app.dictionary.sections/section.static.text/text-form.component";
import { CarvingComponent } from "./carving/carving.component";
import { EtymologicalComponent } from "./etymological/etymological.component";
import { LexicalsheetComponent } from "./lexicalsheet/lexicalsheet.component";


@Component({
  selector: 'roots-results',
  standalone: true,
  templateUrl: './roots-results.component.html',
  styleUrls: ['./roots-results.component.scss'],
  imports: [FormsModule, NgIf, NgClass,NgFor,TranslateModule,
    NgSelectModule, TextFormComponent, LexicalsheetComponent, EtymologicalComponent,
    CarvingComponent]
})
export class RootsResultsComponent implements OnInit, OnChanges {

  @Input() rootId?: number;

  isLexSelected: boolean = true;
  isCarvSelected: boolean = true;
  isEtmelected: boolean = true;
  public openActions: boolean = false;
  public rootHasDocument: boolean = false;
  SelectedRoot?: IRoot;
  constructor(public _sharedRootComponentValues: SharedRootComponentValues,
    public _sharedLemmaComponentValues: SharedLemmaComponentValues,
    private _storeService: StoreService,
    public _sharedConfiguration: SharedConfiguration,
    private _accountService: AccountService,
    private cdr: ChangeDetectorRef) { }

    ngOnInit() {

    }
    ngAfterViewInit() {
      this.cdr.detectChanges();
    }

  toggleRowActions() {
    this.openActions = !this.openActions;
  }

  closeRowActions() {
    this.openActions = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this._sharedRootComponentValues.selectedRoot)
      return;
    if(!this.SelectedRoot)
      this.SelectedRoot = undefined;
    this.isLexSelected = true;
    this.isCarvSelected = true;
    this.isEtmelected = true;
    this.SelectedRoot = this._sharedRootComponentValues.selectedRoot;
    this.rootHasDocument = (this.SelectedRoot != null && this.SelectedRoot.HasDocument == true);
    if (this.SelectedRoot.issplitted == 1) {
      this._storeService.AddSearchWordToRoot(this.SelectedRoot);
    }
    console.log(this.rootId);
  }

  ChangeActiveState(caseNumber: number): boolean {
    if (caseNumber == 1) return (this.isCarvSelected = !this.isCarvSelected);
    else if (caseNumber == 2) return (this.isLexSelected = !this.isLexSelected);
    else if (caseNumber == 3) return (this.isEtmelected = !this.isEtmelected);
else return false;
  }

  DownloadDocument() {
    if (!this.rootId || !this.rootHasDocument || !this.SelectedRoot)
      return;
    var filename = (this.SelectedRoot.rootValue + ".pdf");
    return this._accountService.DownloadRootDocument(this.rootId).subscribe(data => {
      var blob = new Blob([data], { type: 'application/pdf' });
      var url= window.URL.createObjectURL(blob);
      window.open(url);
      }
      ,
      error => []);
  }
}
