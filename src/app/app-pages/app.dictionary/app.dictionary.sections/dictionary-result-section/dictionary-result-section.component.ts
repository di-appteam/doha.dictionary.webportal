import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ISummaryLexicalSheet } from '../../../../app-models/dictionary.model';
import { JustifyArabicDirective } from '../../../../app-shared/directive/justify-arabic.directive';
import { HasPermissionDirective } from '../../../../app-shared/directive/permissions.directive';
import { ClipboardService } from '../../../../app-shared/services/Clipboard.service';
import { SharedConfiguration, SharedFunctions } from '../../../../app-shared/services/config.service';
import { DictionaryService } from '../../../../app-shared/services/dictionary.service';
import { SendCommentComponent } from '../../../../app-shared/shared-sections/send-comment/send-comment.component';
@Component({
  selector: 'dictionary-result-section',
  standalone: true,
  imports: [NgIf,NgClass,NgFor, FormsModule, CarouselModule,PopoverModule,TooltipModule,JustifyArabicDirective, TranslateModule,PopoverModule,SendCommentComponent,HasPermissionDirective],
  templateUrl: './dictionary-result-section.component.html',
  styleUrls: ['./dictionary-result-section.component.scss'],
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
  public compressedSource:string = "";
  constructor(
    public _dictionaryService: DictionaryService,
    private modalService: BsModalService,
    private _cdr: ChangeDetectorRef, public _config: SharedConfiguration, public _sharedFunctions: SharedFunctions, public clipboardService: ClipboardService) { }

  ngOnInit() {
    this.UpdateInfoPopup();
    if (this.lexItem && this.lexItem.referenceSourcePage)
      this.lexItem.referenceSourcePage = this.lexItem.referenceSourcePage.replace("-", "&rlm;-");
    this.getSourceCompressed(this.lexItem);
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
  openPopover(pop:any, isInfo = true) {
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
      this._config.removeBookmarkLocal(lexItem.ID, this._config.bookmarkType.lexicalsheet);
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
  public getSourceCompressed(lexItem?: ISummaryLexicalSheet) {
    let sourceStr = '';
    if(lexItem?.source!=null && lexItem?.source.trim()!=("")){
  //////////////////////////////////////
        if(lexItem?.referencesourcesubtitle!=null && lexItem?.referencesourcesubtitle.trim()!=("")){
            sourceStr += lexItem?.referencesourcesubtitle.trim()+": &rlm;";
        }
        if(lexItem?.referencesourcesubauthor!=null && lexItem?.referencesourcesubauthor.trim()!=("")){
            sourceStr += lexItem?.referencesourcesubauthor.trim()+"،&rlm;";
        }
  //////////////////////////////////////

        sourceStr += lexItem?.source.trim();
        if(sourceStr.endsWith(".")){
            if(sourceStr.endsWith("د.ت.")){
                sourceStr+=" ";
            }else{
                if(sourceStr.length > 1) {
                    sourceStr = sourceStr.substring(0, sourceStr.length - 1);
                    sourceStr += "، ";
                }
            }
        }else{
            sourceStr += "، ";
        }
        sourceStr += "&rlm;";
    }

    if(lexItem?.referenceSourcePart!=null && lexItem?.referenceSourcePart.trim() != ("")){
        sourceStr += lexItem?.referenceSourcePart.trim()+"/&rlm;";
    }

    if(lexItem?.referenceSourcePage!=null && lexItem?.referenceSourcePage.trim() != ("")){
        sourceStr += lexItem?.referenceSourcePage.trim().replace("-","-&rlm;");
    }

    if((lexItem?.referenceSourcePart!=null && lexItem?.referenceSourcePart.trim() != ("")) || (lexItem?.referenceSourcePage!=null && lexItem?.referenceSourcePage.trim() != (""))){
        if( (lexItem?.referenceSourceHaditNbr == null || lexItem?.referenceSourceHaditNbr.trim() == (""))
        && (lexItem?.referenceSourceReadingQuranStr == null || lexItem?.referenceSourceReadingQuranStr.trim() == (""))
        && (lexItem?.referenceSourceAyahNbr == null || lexItem?.referenceSourceAyahNbr.trim() == (""))
       // && (lexItem?.referenceSourceBook == null || lexItem?.referenceSourceChapter.trim() == ("") || lexItem?.referenceSourceVerse.trim() == (""))
        ){

            sourceStr += ".&rlm;";
        }else{
            sourceStr += "،&rlm;";
        }

    }

    /*if(lexItem?.referenceSourceBook!=null && lexItem?.referenceSourceBook.trim()!=""){
        sourceStr += " سِفْرُ "+lexItem?.referenceSourceBook.trim()+"، ";
    }

    if(lexItem?.referenceSourceChapter!=null && lexItem?.referenceSourceChapter.trim()!=""){
        sourceStr += "الإصحاح "+lexItem?.referenceSourceChapter.trim()+"، ";
    }

    if(lexItem?.referenceSourceVerse!=null && lexItem?.referenceSourceVerse.trim()!=""){
        sourceStr += "الآية "+lexItem?.referenceSourceVerse.trim();
    }

    if ((lexItem?.referenceSourceBook != null && lexItem?.referenceSourceBook.trim() != (""))
            || (lexItem?.referenceSourceChapter != null && lexItem?.referenceSourceChapter.trim() != (""))
            || (lexItem?.referenceSourceVerse != null &&  lexItem?.referenceSourceVerse.trim() != (""))) {
                if( (lexItem?.referenceSourceHaditNbr == null || lexItem?.referenceSourceHaditNbr.trim() == (""))
                        && (lexItem?.referenceSourceReadingQuranStr == null || lexItem?.referenceSourceReadingQuranStr.trim() == (""))
                        && (lexItem?.referenceSourceAyahNbr == null || lexItem?.referenceSourceAyahNbr.trim() == (""))
                ) {
                    sourceStr += ".";
                } else if((lexItem?.referencesourcelastseen == null || lexItem?.referencesourcelastseen.trim() == ("")) && (lexItem?.referencesourcepublisheddate == null || lexItem?.referencesourcepublisheddate.trim() == (""))) {
                    sourceStr += "، ";
                }else{
                   sourceStr += "، ";
                }
    }*/

    if(lexItem?.referenceSourceHaditNbr!=null && lexItem?.referenceSourceHaditNbr.trim() != ("")){
        sourceStr += "("+"رقم الحديث: "+lexItem?.referenceSourceHaditNbr.trim()+")";
    }

    if(lexItem?.referenceSourceReadingQuranStr!=null && lexItem?.referenceSourceReadingQuranStr.trim() != ("")){
        sourceStr += "["+" "+lexItem?.referenceSourceReadingQuranStr.trim();
    }

    if(lexItem?.referenceSourceAyahNbr!=null && lexItem?.referenceSourceAyahNbr.trim() != ("")){
        sourceStr += " : "+lexItem?.referenceSourceAyahNbr.trim()+" ]";
    }
/////////////////////////////////////////
    if(lexItem?.referencesourceurl!=null && lexItem?.referencesourceurl.trim() != ("")){
        sourceStr += "<a class=\"glyphicon glyphicon-link w3-text-blue\" style=\"color:#ccaf41\" target=\"_blank\" href=\""+lexItem?.referencesourceurl.trim()+"\" title=\"اضغط لفتح الوثيقة\"></a> "+"،" ;
    }

    if(lexItem?.referencesourcepublisheddate!=null && lexItem?.referencesourcepublisheddate.trim() != ("")){
        sourceStr += " " + "نُشر في: "+moment(lexItem?.referencesourcepublisheddate.trim()).locale('en').format('DD-MM-YYYY')+" م.";
    }

    if(lexItem?.referencesourcelastseen!=null && lexItem?.referencesourcelastseen.trim() != ("")){
      sourceStr += "شوهد في: "+moment(lexItem?.referencesourcelastseen.trim()).locale('en').format('DD-MM-YYYY')+" م.";
    }
///////////////////////////////////////
this.compressedSource = sourceStr.replace("(ت، هـ)",'').replace("(ت، _هـ)",'').replace("(ت، هـ)",'');
}
}
