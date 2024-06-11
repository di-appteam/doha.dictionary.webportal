import { NgIf, NgClass, NgFor } from "@angular/common";
import { Component, OnInit, OnChanges, Input, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule, FaIconComponent, FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faXTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ShareButtonDirective } from "ngx-sharebuttons";
import { ShareButtons } from "ngx-sharebuttons/buttons";
import { SearchSDModel } from "../../../../../app-models/corpus.model";
import { SearchResults } from "../../../../../app-models/dictioanry.search.results.models";
import { ISummaryLexicalSheet } from "../../../../../app-models/dictionary.model";
import { HasPermissionDirective } from "../../../../../app-shared/directive/permissions.directive";
import { ClipboardService } from "../../../../../app-shared/services/Clipboard.service";
import { SharedConfiguration, SharedFunctions } from "../../../../../app-shared/services/config.service";
import { DictionaryService } from "../../../../../app-shared/services/dictionary.service";
import { SharedLemmaComponentValues } from "../../../../../app-shared/services/lemma.general.service";
import { SendCommentComponent } from "../../../../../app-shared/shared-sections/send-comment/send-comment.component";
import { DSearchResultsDetailComponent } from "../../../app.dictionary.sections/d-search-results.detail/d-search-results.detail.component";
import { LemmaSequencesSectionComponent } from "../../../app.dictionary.sections/lemma-sequences-section/lemma-sequences-section.component";
import { TextFormComponent } from "../../../app.dictionary.sections/text-form/text-form.component";



@Component({
  selector: 'app-lexicalsheet',
  standalone: true,
  templateUrl: './lexicalsheet.component.html',
  styleUrls: ['../roots-results.component.scss'],
  imports: [FormsModule, NgIf, NgClass,NgFor,TranslateModule,
    FontAwesomeModule,
    ShareButtons,
    PopoverModule,
    TooltipModule,
    AccordionModule,
    ShareButtonDirective, FaIconComponent,
    HasPermissionDirective,DSearchResultsDetailComponent,
    NgSelectModule, TextFormComponent]
})
export class LexicalsheetComponent implements OnInit, OnChanges {

  @Input() rootId?: number;
  oldRootId?: number;
  isFirstTime = true;
  IsReady = false;
  public data?: SearchResults;
  public viewDropdownOptions: any[] = [];
  public detailsDropdownOptions: any[] = [];
  public showCitation: boolean = false;
  public sortDropdownOptions:any[] = [];
  public selectedViewOption:any;
  public selectedSortOption:any;
  public selectedDetailsOption:any;
  seqModalRef?: BsModalRef;
  commentModalRef?: BsModalRef;
  public openActions = false;
  public shareUrl:string = "https://www.dohadictionary.org/dictionary/"
  constructor(
    library: FaIconLibrary,private _translate: TranslateService,
    private modalService: BsModalService,
    public _dictionaryService: DictionaryService,
    public _config: SharedConfiguration,
    public _sharedFunctions: SharedFunctions,
    public _sharedLemmaComponentValues: SharedLemmaComponentValues,
    public clipboardService: ClipboardService) {
      // Add icons to the library
      library.addIcons(faShareAlt,faFacebook,faTwitter,faLinkedin,faXTwitter,faWhatsapp);
    }

  ngOnInit() {
    this.onClearPage();
    this._translate.get(['general.collapsall', 'general.summarydisplay'
      , 'dictionary.orderbydate', 'dictionary.orderbyalph', 'dictionary.orderbyroot'
      , 'dictionary.onlymeaning', 'dictionary.onlysemantic', 'dictionary.onlynewform'
      , 'general.expandall']).subscribe(words => {
        this.detailsDropdownOptions = [
          {
            text: words['general.collapsall'],
            value: 1
          },
          {
            text: words['general.summarydisplay'],
            value: 2
          },
          {
            text: words['general.expandall'],
            value: 3
          },
        ];
        this.sortDropdownOptions = [{
          text: words['dictionary.orderbydate'],
          value: 1
        },
        {
          text: words['dictionary.orderbyalph'],
          value: 2
        }];
        this.viewDropdownOptions = [{
          text: words['dictionary.onlymeaning'],
          value: 1
        },
        {
          text: words['dictionary.onlysemantic'],
          value: 2
        },
        {
          text: words['dictionary.onlynewform'],
          value: 3
        }];
      });
  }


  onClearPage(): void {
    this.selectedViewOption = undefined;
    this.selectedSortOption = 1;
    this.selectedDetailsOption = 3;
    this.showCitation = true;
  }

  toggleSocialShareTooltip(item: ISummaryLexicalSheet) {
    item.showTooltip = !item.showTooltip;
  }

  // Treat the instructor name as the unique identifier for the object
  trackByID(index:number, item: ISummaryLexicalSheet) {
    return item.ID;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isFirstTime = true;
    if (this.rootId === this.oldRootId || !this.rootId) {
      return;
    }
    else { (this.rootId && this.rootId !== this.oldRootId) }
    {
      this.onClearPage();
      this.IsReady = false;
      this.oldRootId = this.rootId;
      this.getSummaryLexicalSheets();
    }
  }

  getSummaryLexicalSheets() {
    if(!this.oldRootId)
     return ;
    this._sharedLemmaComponentValues.CountLexTab = 0;
    this._dictionaryService.getRootDetail(this.oldRootId).subscribe(
      item => [this._sharedLemmaComponentValues.lexicalSheetList = <ISummaryLexicalSheet[]>this._sharedFunctions.reFormateSheetList(item, this._config.bookmarkType.lemma, this._config), this.onFinishRequest()]);
  }

  onFinishRequest(): void {
    this._sharedLemmaComponentValues.CountLexTab = this._sharedLemmaComponentValues.lexicalSheetList.length;
    for (let i = 0; i < this._sharedLemmaComponentValues.lexicalSheetList.length; i++) {
      this._sharedLemmaComponentValues.lexicalSheetList[i].hiddeLex = false;
      this._sharedLemmaComponentValues.lexicalSheetList[i].additionalTagOrder = i;
      if (this._config.AdditionalTags.getValue().filter((a : any ) => a.additionalTag == this._sharedLemmaComponentValues.lexicalSheetList[i].additionalTag).length > 0 && this._config.AdditionalTags.getValue().filter(a => a.additionalTag == this._sharedLemmaComponentValues.lexicalSheetList[i].additionalTag)[0])
        this._sharedLemmaComponentValues.lexicalSheetList[i].additionalTagGroup = this._config.AdditionalTags.getValue().filter(a => a.additionalTag == this._sharedLemmaComponentValues.lexicalSheetList[i].additionalTag)[0].OrderNum;
      else
        this._sharedLemmaComponentValues.lexicalSheetList[i].additionalTagGroup = 0;
    }
    this.sortLexicalByAdditionalTag();
    this.IsReady = true;
  }

  onChangeSelectedView(newVal:any) {
    this.selectedViewOption = !newVal ? undefined : newVal;
  }
  openModalWithComponent(item: ISummaryLexicalSheet) {
    let searchModal = new SearchSDModel('', item.lemmaId, 10);
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
  setOrderBy(newVal:any): void {
    let sortby = '';
    this.selectedSortOption = !newVal ? 1 : newVal;
    switch (this.selectedSortOption) {
      case 1:
        sortby = 'dateSheet';
        break;
      case 2:
        sortby = 'lemmaValue';
        break;
    }
    this._sharedLemmaComponentValues.lexicalSheetList = this._sharedFunctions.orderByArray(this._sharedLemmaComponentValues.lexicalSheetList, sortby);
    this.sortLexicalByAdditionalTag();
  }
  sortLexicalByAdditionalTag() {
    let sortedList :any[] = [];
    for (let index = 0; index < this._sharedLemmaComponentValues.lexicalSheetList.length; index++) {

      if (sortedList.filter(a => a.ID == this._sharedLemmaComponentValues.lexicalSheetList[index].ID).length > 0)
        continue;
      sortedList.push(this._sharedLemmaComponentValues.lexicalSheetList[index]);
      sortedList = sortedList.concat(this._sharedLemmaComponentValues.lexicalSheetList.filter(a => a.additionalTagGroup == this._sharedLemmaComponentValues.lexicalSheetList[index].additionalTagGroup && a.lemmaValue == this._sharedLemmaComponentValues.lexicalSheetList[index].lemmaValue && a.ID != this._sharedLemmaComponentValues.lexicalSheetList[index].ID));

    }
    this._sharedLemmaComponentValues.lexicalSheetList = sortedList;
  }
  setSelectedDetail(newVal:any): void {
    let sortby = '';
    this.selectedDetailsOption = !newVal ? 1 : newVal;
    this.showCitation = (this.selectedDetailsOption != 2);
    this.isFirstTime = false;
  }
  toggleRowActions(item: ISummaryLexicalSheet) {
    item.openActions = !item.openActions;
  }
  closeRowActions(item: ISummaryLexicalSheet) {
    item.openActions = false;
  }


  addBookmark(lexItem: ISummaryLexicalSheet) {
    this._dictionaryService.BookmarkAction(this._config.bookmarkType.lemma, lexItem).subscribe(item => this.afterBookmark(lexItem));
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


  afterBookmark(lexItem: ISummaryLexicalSheet) {
    lexItem.IsBookMark = !lexItem.IsBookMark;
    if (!lexItem.IsBookMark) {
      this._config.removeBookmarkLocal(lexItem.ID, this._config.bookmarkType.lemma);
    }
  }


  CopyLexical(toolTip: any, lexItem: ISummaryLexicalSheet) {
    this.clipboardService.copyLexicalToClipBoard(toolTip, lexItem);
  }
}
