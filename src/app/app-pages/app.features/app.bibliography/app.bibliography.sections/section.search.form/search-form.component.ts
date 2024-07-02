import { NgIf, NgClass } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { SearchSDModel } from "../../../../../app-models/bibliography.model";
import { SharedBibliographyComponentValues } from "../../../../../app-shared/services/bibliography.general.service";
import { SharedConfiguration } from "../../../../../app-shared/services/config.service";


@Component({
  selector: 'search-form',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass,TranslateModule,
    NgSelectModule],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchSDModel: SearchSDModel = new SearchSDModel();
  private sub!: Subscription;
  pendingReq: boolean = false;

  constructor(private _sharedBibliographyComponentValues: SharedBibliographyComponentValues,
    private cdr: ChangeDetectorRef,public _sharedConfiguration : SharedConfiguration) { }
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
      text: 'مصادر النظائر السامية',
      value: 3
    },
  ];
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
  public selectedDateTypeDropdown = 1;
  public selectedDateTypeHijriFromDropdown = 1;
  public selectedDateTypeHijriToDropdown = 1;
  public selectedDateDropdown = 1;
  public dateFrom:any;
  public dateTo:any;
  ngOnInit() {
    this.sub = this._sharedBibliographyComponentValues.obsStrSearch.subscribe(
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

  showAdvancedSearch() {
    this.searchSDModel.IsAdvancedSearch = !this.searchSDModel.IsAdvancedSearch;
  }
  onParmChanged() {
    this.searchSDModel.IsHijri = false;
    this.prepareAdvancedSearch();
    this._sharedBibliographyComponentValues.obsCtrSearch.next(this.searchSDModel);
  }

  prepareAdvancedSearch() {
    if (this.searchSDModel.sourceType == 1 && this.searchSDModel.IsAdvancedSearch == true) {
      this.searchSDModel.IsHijri = (this.selectedDateTypeDropdown == 1);
      this.searchSDModel.DateFrom = this.dateFrom;
      this.searchSDModel.DateTo = this.dateTo;
      if (this.selectedDateTypeDropdown == 1) {
        if (this.selectedDateTypeHijriFromDropdown == 1 && this.searchSDModel.DateFrom! > 0)
          this.searchSDModel.DateFrom! *= -1;
        if (this.selectedDateTypeHijriToDropdown == 1 && this.searchSDModel.DateTo! > 0)
          this.searchSDModel.DateTo! *= -1;
      }
      else {
        if (this.searchSDModel.DateFrom! < 0)
          this.searchSDModel.DateFrom! *= -1;
        if (this.searchSDModel.DateTo! < 0)
          this.searchSDModel.DateTo! *= -1;
      }
    }
  }
}
