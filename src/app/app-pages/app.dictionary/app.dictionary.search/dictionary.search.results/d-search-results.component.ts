import { Component, OnInit, Renderer2, ElementRef, Input, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import { SearchSDModel } from "../../../../app-models/corpus.model";
import { SearchDictionaryModel, ISummaryLexicalSheet, ISearchByLemmaResultResponse } from "../../../../app-models/dictionary.model";
import { ClipboardService } from "../../../../app-shared/services/Clipboard.service";
import { SharedConfiguration, SharedFunctions } from "../../../../app-shared/services/config.service";
import { DictionaryService } from "../../../../app-shared/services/dictionary.service";
import { SharedLemmaComponentValues } from "../../../../app-shared/services/lemma.general.service";
import { PagerService } from "../../../../app-shared/services/pager.service";
import { SharedRootComponentValues } from "../../../../app-shared/services/root.general.service";
import { StoreService } from "../../../../app-shared/services/store.service";
import { DictionarySearchFormComponent } from "../../../../app-shared/shared-sections/dictionary-search-section/search-form.component";
import { SendCommentComponent } from "../../../../app-shared/shared-sections/send-comment/send-comment.component";
import { LemmaSequencesSectionComponent } from "../../app.dictionary.sections/section.lemma.sequences/lemma-sequences-section.component";
import { PrevSearchResultSectionComponent } from "../../app.dictionary.sections/sectione.saved.search.words/prev-search-result-section.component";
import { TextFormComponent } from "../../app.dictionary.sections/section.static.text/text-form.component";
import { Router, RouterModule } from "@angular/router";
import { AlertEnum, AlertMessages, SORRY } from "../../../../app-models/dictioanry.search.results.models";
import { AlertComponent } from "../../../../app-shared/shared-sections/alert/alert.component";
import { FaIconComponent, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgClass, NgFor, NgIf } from "@angular/common";
import { ShareButtons } from 'ngx-sharebuttons/buttons';
import { ShareButton } from 'ngx-sharebuttons/button';
import { provideShareButtonsOptions, withConfig, SharerMethods, ShareButtonDirective } from "ngx-sharebuttons";
import { shareIcons } from 'ngx-sharebuttons/icons';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HasPermissionDirective } from "../../../../app-shared/directive/permissions.directive";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faTwitter, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { DSearchResultsDetailComponent } from "../../app.dictionary.sections/section.search.result.parent/d-search-results.detail.component";
@Component({
  selector: 'd-search-results',
  standalone: true,
  templateUrl: './d-search-results.component.html',
  styleUrls: ['./d-search-results.component.scss'],
  imports: [
    TranslateModule,
    PopoverModule,
    TooltipModule,
    NgClass,
    NgIf,
    NgFor,
    FormsModule,
    FontAwesomeModule,
    ShareButtons,
    ShareButton,
    RouterModule,
    AccordionModule,
    NgSelectModule,
    TextFormComponent,
    DictionarySearchFormComponent,
    DSearchResultsDetailComponent,
    AlertComponent,
    PrevSearchResultSectionComponent,
    ShareButtonDirective, FaIconComponent,
    HasPermissionDirective],
  providers: [
  ]
})
export class DSearchResultsComponent implements OnInit {


  commentModalRef?: BsModalRef;
  public alertType?: AlertEnum;
  public alertMessage: string = "";
  searchDictionaryModel: SearchDictionaryModel = new SearchDictionaryModel();
  resultTotalCount: number = 0;
  searchTime: any;
  selectedDetailsOption: any;
  public detailsDropdownOptions: any[] = [];
  lemmaWord: string = "";
  alertErrorType = AlertEnum.ERROR;
  oldWordValue: string = "";
  errorMessage: string = "";
  summaryLexicalSheet: ISummaryLexicalSheet[] = [];
  acSummaryLexicalSheet: ISummaryLexicalSheet[] = [];
  resultPageSize: number = 0;
  pager: any;
  selectedItemForShareId: number = 0;
  pageSizeList: number[] = [5, 10, 20, 50, 100];
  dataParm?: ISearchByLemmaResultResponse;
  private sub?: Subscription;
  private subLemmaSearch?: Subscription;
  private subBMSearch?: Subscription;
  private subAutoLemmaSearch?: Subscription;
  seqModalRef?: BsModalRef;
  public shareUrl: string = "https://www.dohadictionary.org/dictionary/"

  constructor(
    library: FaIconLibrary,
    public _dictionaryService: DictionaryService,
    public _config: SharedConfiguration,
    public _sharedFunctions: SharedFunctions,
    private _pagerService: PagerService,
    private _storeService: StoreService,
    private _sharedRootComponentValues: SharedRootComponentValues,
    public _sharedLemmaComponentValues: SharedLemmaComponentValues,
    private _router: Router,
    private modalService: BsModalService,
    private _translate: TranslateService,
    public clipboardService: ClipboardService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private _elementRef: ElementRef) {
    // Add icons to the library
    library.addIcons(faShareAlt, faFacebook, faTwitter, faLinkedin, faXTwitter, faWhatsapp);
    this.subLemmaSearch = this._sharedLemmaComponentValues.obsCtrSearch.subscribe(
      searchItem => {
        if (searchItem) {
          this.searchDictionaryModel = searchItem;
          this.parmChange(true);
        }
      });
    this.subAutoLemmaSearch = this._sharedLemmaComponentValues.obsSearchWord.subscribe(
      word => {
        if (word) {
          if (this.searchDictionaryModel.SearchWord == word)
            return;
          this.searchDictionaryModel.SearchWord = word;
          this.parmChange(false);
        }
      });
  }



  ngOnInit(): void {
    this.clearPage();
    this._translate.get(["general.collapsall", "general.summarydisplay", "general.expandall"]).subscribe(words => {
      this.detailsDropdownOptions = [
        {
          text: words["general.collapsall"],
          value: 1
        },
        {
          text: words["general.summarydisplay"],
          value: 2
        },
        {
          text: words["general.expandall"],
          value: 3
        },
      ];
    });
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.selectedItemForShareId && this.selectedItemForShareId > 0) {
        var selectedItem = this.summaryLexicalSheet.filter(a => a.ID == this.selectedItemForShareId)[0];
        selectedItem.showTooltip = false;
        this.selectedItemForShareId = 0;
      }
    });
  }

  toggleSocialShareTooltip(item: ISummaryLexicalSheet) {
    item.showTooltip = !item.showTooltip;
    this.selectedItemForShareId = item.ID;
  }
  openModalWithComponent(item: ISummaryLexicalSheet) {
    var searchModal = new SearchSDModel('', item.lemmaId, 10);
    const initialState = {
      searchModal: searchModal,
      lemmaValue: item.lemmaValue
    };
    const config = {
      class: 'modal-lg',
      initialState: initialState
    };
    this.seqModalRef = this.modalService.show(LemmaSequencesSectionComponent, config);
    this.seqModalRef.content.closeBtnName = 'Close';
  }
  toggleRowActions(item: ISummaryLexicalSheet) {
    item.openActions = !item.openActions;
  }

  closeRowActions(item: ISummaryLexicalSheet) {
    item.openActions = false;
  }

  parmChange(fromSearch: boolean, newValue: string = ""): void {
    this.resultTotalCount = 0;
    this.searchTime = 0;
    this.oldWordValue = newValue;
    this._sharedLemmaComponentValues.pageNumber = fromSearch == true ? 1 : this._sharedLemmaComponentValues.pageNumber;
    const startTime = new Date().getTime();
    this.searchDictionaryModel.SearchWord = newValue ? newValue : this.searchDictionaryModel.SearchWord;
    this.searchDictionaryModel.Page = this._sharedLemmaComponentValues.pageNumber;
    this.searchDictionaryModel.PageSize = this.resultPageSize;
    this._dictionaryService.SearchInLemma(this.searchDictionaryModel)
      .subscribe(searchResult => [this.initComponent(searchResult, startTime)],
        error => [this.initComponent([], startTime)]);
  }

  public reWriteDateSheet(date: number, isDeathDate: boolean): string {
    return this._sharedFunctions.reWriteDateSheet(date, isDeathDate);
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this._sharedLemmaComponentValues.pageNumber = page;
    this.parmChange(false);
  }
  setPager(totalNumber: number) {
    // get pager object from service
    this.pager = this._pagerService.getPager(totalNumber, this._sharedLemmaComponentValues.pageNumber, this.resultPageSize);
  }
  onSelectRoot(rootId: number): void {
    var root = this._sharedRootComponentValues.GetRootById(rootId);
    if (!root)
      return;
    this._sharedRootComponentValues.SelectRoot(root, this._storeService);
    this._router.navigate(['/root/']);
  }
  clearPage(forceResetSearchModel: boolean = false): void {
    if (forceResetSearchModel)
      this.searchDictionaryModel = new SearchDictionaryModel();
    this.resultTotalCount = 0;
    this.searchTime = 0;
    this.selectedDetailsOption = 1;
    this.resultPageSize = this._sharedLemmaComponentValues.lemmaPageSize;
    this.lemmaWord = "";
    this.oldWordValue = "";
    this.errorMessage = "";
    this.pager = {};
  }
  initComponent(searchResult: any, startTime: any): void {
    if ((searchResult.Data && searchResult.Data.length > 0) || searchResult.TotalCount > 0) {
      this.alertType = AlertEnum.SUCCCESS;
      this.alertMessage = AlertMessages.SUCCCESS(searchResult.TotalCount);
      this.searchTime = Math.ceil((new Date().getTime() - startTime) / 1000);
      this.setPager(searchResult.TotalCount)
      this.resultTotalCount = searchResult.TotalCount;
      this.summaryLexicalSheet = <ISummaryLexicalSheet[]>this._sharedFunctions.reFormateSheetList(searchResult.Data, this._config.bookmarkType.lemma, this._config);
      if (this.searchDictionaryModel.SearchWord && this.searchDictionaryModel.SearchWord != '' && this.summaryLexicalSheet.length > 0)
        this._storeService.AddSearchWord(this.searchDictionaryModel.SearchWord);
    } else {
      this.resultTotalCount = 0;
      this.summaryLexicalSheet = [];
      this.alertType = AlertEnum.ERROR;
      this.alertMessage = AlertMessages.ERROR(SORRY)
    }
    this.cdr.detectChanges();
  }
  pageSizeChanged(parmPageSize: number): void {
    if (parmPageSize == this.resultPageSize)
      return;
    this.resultPageSize = parmPageSize;
    this.parmChange(true)
  }
  openlexical(item: ISummaryLexicalSheet): void {
    item.parmId = item.ID;
  }


  // Treat the instructor name as the unique identifier for the object
  trackByID(index: number, item: ISummaryLexicalSheet) {
    return item.ID;
  }


  addBookmark(lexItem: ISummaryLexicalSheet) {
    this._dictionaryService.BookmarkAction(this._config.bookmarkType.lemma, lexItem).subscribe(item => this.afterBookmark(lexItem));
  }

  afterBookmark(lexItem: ISummaryLexicalSheet) {
    lexItem.IsBookMark = !lexItem.IsBookMark;
    if (!lexItem.IsBookMark)
      this._config.removeBookmarkLocal(lexItem.ID, this._config.bookmarkType.lemma);
  }

  sendComment(lexItem: ISummaryLexicalSheet) {
    const initialState = {
      lexical: lexItem
    };
    const config = {
      class: 'modal-sm',
      initialState: initialState
    };
    this.commentModalRef = this.modalService.show(SendCommentComponent, config);
    this.commentModalRef.content.closeBtnName = 'Close';
  }


  CopyLexical(toolTip: any, lexItem: ISummaryLexicalSheet) {
    this.clipboardService.copyLexicalToClipBoard(toolTip, lexItem);
  }

}
