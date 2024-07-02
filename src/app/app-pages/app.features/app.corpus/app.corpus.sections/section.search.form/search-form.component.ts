import { NgIf, NgClass } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { SearchSDModel } from "../../../../../app-models/corpus.model";
import { SharedConfiguration } from "../../../../../app-shared/services/config.service";
import { SharedCorpusComponentValues } from "../../../../../app-shared/services/corpus.general.service";


@Component({
  selector: 'search-form',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass,TranslateModule,
    NgSelectModule],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchSDModel: SearchSDModel = new SearchSDModel('');
  private sub!: Subscription;
  pendingReq: boolean = false;

  constructor(private _sharedCorpusComponentValues: SharedCorpusComponentValues,
    private cdr: ChangeDetectorRef,public _sharedConfiguration : SharedConfiguration) { }



  ngOnInit() {
    this.sub = this._sharedCorpusComponentValues.obsStrSearch.subscribe(
      word => {
        this.searchSDModel = new SearchSDModel(word);
        this.onParmChanged();
     });

     this._sharedConfiguration.pendingReq.subscribe(
      isPending => {
        this.pendingReq = isPending;
        this.cdr.detectChanges();
      });
  }
  onParmChanged() {
    this._sharedCorpusComponentValues.corpusSearchResult = [];
    this._sharedCorpusComponentValues.obsCtrSearch.next(this.searchSDModel);
  }
}

  /*public advancedSearch: boolean = false;
  public resourcesDropdownOptions = [
    {
      text: 'مصادر النصوص',
      value: 1
    },
    {
      text: 'مصادر النقوش',
      value: 2
    },
    {
      text: 'مصادر التأثيــل',
      value: 3
    },
  ];
  public selectedResourcesOption = this.resourcesDropdownOptions[0].value;

  public advancedInputDropdownOptions = [
    {
      text: 'أو',
      value: 1
    },
    {
      text: 'و',
      value: 2
    },
  ];
  public selectedAdvancedInputOption = this.resourcesDropdownOptions[0].value;

  public dateTypeDropdownOptions = [
    {
      text: "هـ",
      value: 1
    },
    {
      text: "م",
      value: 2
    },
  ];
  public selectedDateTypeDropdown = this.dateTypeDropdownOptions[0].value;*/
 /*showAdvancedSearch() {
    this.advancedSearch = !this.advancedSearch;
  }*/
