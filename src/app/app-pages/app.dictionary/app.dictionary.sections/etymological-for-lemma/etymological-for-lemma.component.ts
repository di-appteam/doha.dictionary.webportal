import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { IEtymologicalLexicalSheet } from '../../../../app-models/dictionary.model';
import { DictionaryService } from '../../../../app-shared/services/dictionary.service';
import { RootSectionComponent } from '../../../../app-shared/shared-sections/root-section/root-section.component';

@Component({
  selector: 'app-etymological-for-lemma',
  standalone: true,
  imports: [NgIf,NgClass,NgFor, FormsModule, CarouselModule, TranslateModule,RootSectionComponent],
  templateUrl: './etymological-for-lemma.component.html',
  styleUrls: ['./etymological-for-lemma.component.scss']
})
export class EtymologicalForLemmaComponent implements OnInit, OnChanges {
  @Input() rootId?: any;
  @Input() lemmaId?: any;
  @Input() lemmaVal?: any;
  oldRootId?: number;
  oldLemmaId?: number;
  oldLemmaVal?: number;
  IsReady: boolean = false;
  item?: IEtymologicalLexicalSheet;
  constructor(private _dictionaryService: DictionaryService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.rootId || this.rootId === this.oldRootId || this.lemmaId === this.oldLemmaId || !this.lemmaId || this.lemmaVal === this.oldLemmaVal || !this.lemmaVal)
      return;
    else if ((this.rootId && this.rootId !== this.oldRootId) && (this.lemmaId && this.lemmaId !== this.oldLemmaId)) {
      this.IsReady = false;
      this.oldRootId = this.rootId;
      this.oldLemmaId = this.lemmaId;
      this.oldLemmaVal = this.lemmaVal;
      this.getEtymologicalLexicalSheet();
    }
  }
  getEtymologicalLexicalSheet() {
    this._dictionaryService.GetEtymologicalLexicalSheetForLemma(this.oldRootId, this.oldLemmaId).subscribe(
      item => [this.reformateEtymological(item), this.onFinishRequest()]);
  }
  onFinishRequest(): void {
    this.IsReady = (this.item != null);
  }
  reformateEtymological(etymologicalLexicalSheetList: any) {
    let newStr = "";
    this.item = etymologicalLexicalSheetList[0];
    if (this.item?.etymologylanguage.substr(this.item.etymologylanguage.length - 1) == '@')
      this.item.etymologylanguage = this.item.etymologylanguage.slice(0, (this.item.etymologylanguage.length - 1));
    var etmExtrList = this.item?.etymologylanguage.split("@")??[];
    for (let index = 0; index < etmExtrList.length; index++) {
      if(index> 0 && etmExtrList.length > 1)
       newStr += "<br>";
      const element = etmExtrList[index];
      let fHashIndex = element.indexOf('#');
      newStr += element.substr(0, fHashIndex) + " <span class='dark-red'> " + element.substr((fHashIndex + 1), (element.length));
      let sHashIndex = newStr.indexOf('#');
      newStr = newStr.substr(0, sHashIndex) + " </span> " + "<br><span class='dark-red'>" + this.oldLemmaVal + "</span>: " + newStr.substr((sHashIndex + 1), (newStr.length));
    }
    if(this.item)
      this.item.etymologylanguage = newStr;
  }

}
