import { NgIf, NgClass, NgFor } from "@angular/common";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { SearchSDModel, summarydocuments, summarydocumentsResponse } from "../../../../app-models/bibliography.model";
import { HasPermissionDirective } from "../../../../app-shared/directive/permissions.directive";
import { SharedBibliographyComponentValues } from "../../../../app-shared/services/bibliography.general.service";
import { BibliographyService } from "../../../../app-shared/services/bibliography.service";
import { SharedConfiguration } from "../../../../app-shared/services/config.service";
import { PagerService } from "../../../../app-shared/services/pager.service";
import { AlertComponent } from "../../../../app-shared/shared-sections/alert/alert.component";
import { TextFormComponent } from "../section.text.form/text-form.component";
import { SearchResults, AlertEnum, AlertMessages, SORRY } from "./b-search-results.models";


@Component({
  selector: 'b-search-results',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass,TranslateModule,NgFor,
    NgSelectModule,TextFormComponent,AlertComponent,HasPermissionDirective],
  templateUrl: './b-search-results.component.html',
  styleUrls: ['./b-search-results.component.scss']
})
export class SearchResultsComponent implements OnInit,OnDestroy{

  @Input() data!: SearchResults;
  public alertType?: AlertEnum;
  public alertMessage!: string;
  sourceType : number = 1;
  alertErrorType = AlertEnum.ERROR;
  pageSizeList: number[] = [5, 10, 15, 20, 50, 100];
  public sortDropdownOptions : any = [];
  public selectedSortOption = 1;
  searchSDModel: SearchSDModel = new SearchSDModel();
  pageNumber = 1;
  pager: any = {};
  pSize = this._sharedBibliographyComponentValues.pSize;
  private sub!: Subscription;
  public showTxt : boolean = true;



  constructor(private _translate: TranslateService,public _config: SharedConfiguration,private _bibliographyService: BibliographyService,
    private _pagerService: PagerService,
    public _sharedBibliographyComponentValues: SharedBibliographyComponentValues) { }


  ngOnInit() {
    this.sub = this._sharedBibliographyComponentValues.obsCtrSearch.subscribe(
      searchModal => {
        this.searchSDModel = searchModal;
        this.sourceType = searchModal.sourceType;
        this.onPrmChange(1);
        this.showTxt = false;
      });
      this._translate.get([ "dictionary.orderbydate", "dictionary.orderbyalph"]).subscribe(words => {
          this.sortDropdownOptions = [
            {
              text: words["dictionary.orderbyalph"],
              value:1
            },{
            text: words["dictionary.orderbydate"],
            value: 2
          }
         ];
        });
    //this.onPrmChange(1);
  }

  onPrmChange(pageN = this.pageNumber): void {
    if (pageN && this.pageNumber !== pageN) {
      this.pageNumber = pageN;
    }

    this.alertType = undefined;
    this._bibliographyService.getbibliography(pageN, this.searchSDModel, this.pSize)
      .subscribe((searchResult:any) => [this.succeededRequest(searchResult)]);
  }

  succeededRequest(searchResult: summarydocumentsResponse) {
    if (!searchResult || !searchResult.Data || searchResult.Data.length == 0)
      return this.errorOnRequest();
    this.setPager(searchResult.TotalCount);
    searchResult.Data.forEach(element => {
      element.IsBookMark = (this._config.UserBookmarkList.getValue().filter(a => a.bookmarktypeid == this._config.bookmarkType.reference && a.saveditemid ==  element.id).length > 0);
    });
    this._sharedBibliographyComponentValues.summarydocuments = <summarydocuments[]>searchResult.Data;
    this.alertType = AlertEnum.SUCCCESS;
    this.alertMessage = AlertMessages.SUCCCESS(searchResult.TotalCount);
  }

  errorOnRequest() {
    this._sharedBibliographyComponentValues.summarydocuments = [];
    this.alertType = AlertEnum.ERROR;
    this.alertMessage = AlertMessages.ERROR(SORRY);
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
    this._sharedBibliographyComponentValues.summarydocuments = [];
  }


  setOrderBy(newVal:number) {
    this.searchSDModel.orderBy = !newVal ? 1 : newVal;
    this.onPrmChange();
  }

  addBookmark(item: summarydocuments){
    this._bibliographyService.BookmarkAction(item).subscribe((res:any)=> this.afterBookmark(item));
  }

  afterBookmark(item: summarydocuments){
    item.IsBookMark = !item.IsBookMark;
  }
}
