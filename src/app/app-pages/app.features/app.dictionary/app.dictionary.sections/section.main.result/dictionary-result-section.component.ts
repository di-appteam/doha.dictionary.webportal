import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ISummaryLexicalSheet } from '../../../../../app-models/dictionary.model';
import { JustifyArabicDirective } from '../../../../../app-shared/directive/justify-arabic.directive';
import { HasPermissionDirective } from '../../../../../app-shared/directive/permissions.directive';
import { ClipboardService } from '../../../../../app-shared/services/Clipboard.service';
import { SharedConfiguration, SharedFunctions } from '../../../../../app-shared/services/config.service';
import { DictionaryService } from '../../../../../app-shared/services/dictionary.service';
import { SendCommentComponent } from '../../../../../app-shared/shared-sections/send-comment/send-comment.component';
import { BookMarkService } from '../../../../../app-shared/services/bookmark.service';
import { ConfigJsonService } from '../../../../../app-shared/services/configjson.service';
@Component({
  selector: 'dictionary-result-section',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, FormsModule, CarouselModule, PopoverModule, TooltipModule, JustifyArabicDirective, TranslateModule, PopoverModule, SendCommentComponent, HasPermissionDirective],
  templateUrl: './dictionary-result-section.component.html',
  styleUrls: ['./dictionary-result-section.component.scss'],
  providers: [BookMarkService]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionaryResultSectionComponent implements OnInit, AfterViewInit {


  @ViewChild('contentEditable', { static: true }) public el?: ElementRef;
  commentModalRef?: BsModalRef;
  @ViewChild('addThisDiv', { static: true }) addThisDiv?: ElementRef;
  @Input() lexItem?: ISummaryLexicalSheet;
  @Input() showCitation = true;
  @Input() isMening = true;
  @Input() fromBookmark = false;
  @Output() removeBookmark = new EventEmitter<ISummaryLexicalSheet>();
  public infoMeaning = "";
  public infoRoot = "";
  public infoLemma = "";
  public infoLemmaTag = "";
  public isInfoAvailable = false;
  public popover: any;
  public popoverRes: any;
  public compressedSource: string = "";
  constructor(
    public _dictionaryService: DictionaryService, public configjsonService: ConfigJsonService,
    private modalService: BsModalService, private bookMarkService: BookMarkService,
    private _cdr: ChangeDetectorRef, public _config: SharedConfiguration, public _sharedFunctions: SharedFunctions, public clipboardService: ClipboardService) { }

  ngOnInit() {
    this.UpdateInfoPopup();
    if (this.lexItem && this.lexItem.referenceSourcePage)
      this.lexItem.referenceSourcePage = this.lexItem.referenceSourcePage.replace("-", "&rlm;-");
    this.getSourceCompressed(this.lexItem!);
  }

  ngAfterViewInit(): void {
    // Since we know the list is not going to change
    // let's request that this component not undergo change detection at all
    // this._cdr.detach();
  }

  closePopover(isInfo = true) {
    if (isInfo == true) {
      this.popover.hide();
    } else {
      this.popoverRes.hide();
    }
  }
  openPopover(pop: any, isInfo = true) {
    if (isInfo == true) {
      this.popover = pop;
      this.popover.toggle();
    } else {
      this.popoverRes = pop;
      this.popoverRes.toggle();
    }
  }

  UpdateInfoPopup() {
    this.isInfoAvailable = (this._sharedFunctions.CheckDisplayRemark(this.lexItem, this._config.RemarkType.Meaning) || this._sharedFunctions.CheckDisplayRemark(this.lexItem, this._config.RemarkType.Root) || this._sharedFunctions.CheckDisplayRemark(this.lexItem, this._config.RemarkType.Lemma) || this._sharedFunctions.CheckDisplayRemark(this.lexItem, this._config.RemarkType.LemmaTag));
    if (this._sharedFunctions.CheckDisplayRemark(this.lexItem, this._config.RemarkType.Root)) {
      this.infoRoot = this._sharedFunctions.DisplayRemark(this.lexItem, this._config.RemarkType.Root);
    }
    if (this._sharedFunctions.CheckDisplayRemark(this.lexItem, this._config.RemarkType.Lemma)) {
      this.infoLemma = this._sharedFunctions.DisplayRemark(this.lexItem, this._config.RemarkType.Lemma);
    }
    if (this._sharedFunctions.CheckDisplayRemark(this.lexItem, this._config.RemarkType.LemmaTag)) {
      this.infoLemmaTag = this._sharedFunctions.DisplayRemark(this.lexItem, this._config.RemarkType.LemmaTag);
    }
    if (this._sharedFunctions.CheckDisplayRemark(this.lexItem, this._config.RemarkType.Meaning)) {
      this.infoMeaning = this._sharedFunctions.DisplayRemark(this.lexItem, this._config.RemarkType.Meaning);
    }
  }

  filterAutherName(autherName: string): string {
    const index = autherName.indexOf('(');
    let result = autherName;
    if (index && index > 0) {
      result = autherName.slice(0, (1 + index));
    }
    if (result.includes('(')) {
      return autherName.slice(0, index);
    }
    return result;
  }

  addBookmark(lexItem: ISummaryLexicalSheet) {
    this._dictionaryService.BookmarkAction(this._config.bookmarkType.lexicalsheet, lexItem).subscribe(item => this.afterBookmark(lexItem));
  }

  afterBookmark(lexItem: ISummaryLexicalSheet) {
    lexItem.IsBookMark = !lexItem.IsBookMark;
    if (!lexItem.IsBookMark) {
      this.bookMarkService.removeBookmarkLocal(lexItem.ID, this._config.bookmarkType.lexicalsheet);
    }
    if (!this.fromBookmark) {
      return;
    }
    this.removeBookmark.next(lexItem);
  }

  sendComment(lexItem: ISummaryLexicalSheet) {
    const initialState = {
      lexical: lexItem,
      messageBody: document.getElementsByClassName('item-body').item(0)?.innerHTML
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
  public getSourceCompressed(lexItem: ISummaryLexicalSheet): void {
    if (!lexItem) return;

    let sourceStr: string[] = [];

    // ✅ Helper Function: Adds values only if they exist
    const addIfExists = (value: string | null, prefix: string = "", suffix: string = "،") => {
      if (value && value.trim()) sourceStr.push(`${prefix}${value.trim()}${suffix}`);
    };

    // ✅ Extracted values to avoid multiple `.trim()` calls
    const {
      source, citationSource, referencesourcesubtitle, referencesourcesubauthor,
      referencesourcebook, referencesourcechapter, referencesourceverse,
      referenceSourcePart, referenceSourcePage, referenceSourceHaditNbr,
      referenceSourceReadingQuranStr, referenceSourceAyahNbr, referencesourceurl,
      referencesourcelastseen, referencesourcepublisheddate, citation,
      authorName, quranic
    } = lexItem;

    // ✅ Handling Source & Citation
    if ((source && source.trim()) || (citationSource && citationSource.trim())) {
      addIfExists(referencesourcesubtitle, "", ": &rlm;");
      addIfExists(referencesourcesubauthor, "", "،&rlm;");

      // ✅ Handling citation/source selection
      sourceStr.push(
        !quranic && citation.includes('cnvQCF2BSML') ? authorName :
          quranic ? citationSource :
            (source && source.trim() ? source.trim() : "")
      );

      // ✅ Fix punctuation at the end
      let lastPart = sourceStr[sourceStr.length - 1] || "";
      if (lastPart.endsWith(".")) {
        sourceStr[sourceStr.length - 1] = lastPart.endsWith("د.ت.") ? lastPart + " " : lastPart.slice(0, -1) + "، ";
      } else {
        sourceStr.push("، ");
      }
      sourceStr.push("&rlm;");
    }

    // ✅ Handling non-Quranic references
    if (!quranic) {
      if (!(referencesourcechapter || referencesourcebook || referencesourceverse)) {
        addIfExists(referenceSourcePart, "", "/&rlm;");
        if (referenceSourcePage) addIfExists(referenceSourcePage.replace("-", "-&rlm;"));

        if (referenceSourcePart || referenceSourcePage) {
          sourceStr.push((!referenceSourceHaditNbr && !referenceSourceReadingQuranStr && !referenceSourceAyahNbr) ? ".&rlm;" : "،&rlm;");
        }
      } else {
        addIfExists(referencesourcebook, " سِفْرُ ", "، ");
        addIfExists(referencesourcechapter, "الإصحاح ", "، ");
        addIfExists(referencesourceverse, "الآية ");
      }

      if (referenceSourceHaditNbr && referenceSourceHaditNbr.trim()) {
        sourceStr.push(`(رقم الحديث: ${referenceSourceHaditNbr.trim()})`);
      }

      if (!quranic && citation.includes('cnvQCF2BSML')) {
        addIfExists(referenceSourceReadingQuranStr, "[ ", "");
        addIfExists(referenceSourceAyahNbr, " : ", " ]");
      }

      if (referencesourcebook || referencesourcechapter || referencesourceverse) {
        sourceStr.push((!referenceSourceHaditNbr && !referenceSourceReadingQuranStr && !referenceSourceAyahNbr) ? "." : "، ");
      }
    }

    // ✅ Adding URL & Publication Details
    if (referencesourceurl && referencesourceurl.trim()) {
      sourceStr.push(
        `<a class="glyphicon glyphicon-link w3-text-blue" style="color:#ccaf41" target="_blank" 
      href="${referencesourceurl.trim()}" title="اضغط لفتح الوثيقة"></a> ،`
      );
    }

    if (referencesourcepublisheddate && referencesourcepublisheddate.trim()) {
      sourceStr.push(` نُشر في: ${moment(referencesourcepublisheddate.trim()).locale('ar').format('DD-MM-YYYY')} م.`);
    }

    if (referencesourcelastseen && referencesourcelastseen.trim()) {
      sourceStr.push(` شوهد في: ${moment(referencesourcelastseen.trim()).locale('ar').format('DD-MM-YYYY')} م.`);
    }

    // ✅ Final String Cleanup
    this.compressedSource = sourceStr.join("")
      .replace(/، &rlm;\. /g, '&rlm;')  // ✅ Fix misplaced punctuation
      .replace(/&rlm;/g, '')            // ✅ Remove unnecessary LRM markers
      .trim()                           // ✅ Ensure clean output
      .concat(".") // ✅ Ensure ending with a single period
      .replace(/،\./g, '.')             // ✅ Prevent "،." occurrences
      .replace(/\../g, '.')             // ✅ Prevent ".." occurrences
      .replace(/\(ت، _?هـ\)/g, '')      // ✅ Remove variations of "(ت، هـ)" in one step
      .trim();                           // ✅ Ensure clean output

  }
}
