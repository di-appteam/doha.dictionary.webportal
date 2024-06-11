import { NgIf, NgClass, NgFor } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { ISummaryEtymologicalLexicalSheet } from '../../../../../app-models/dictionary.model';
import { GroupByPipe } from '../../../../../app-shared/pipe/GroupByPipe';
import { SharedFunctions } from '../../../../../app-shared/services/config.service';
import { DictionaryService } from '../../../../../app-shared/services/dictionary.service';
import { SharedLemmaComponentValues } from '../../../../../app-shared/services/lemma.general.service';
import { TextFormComponent } from '../../../app.dictionary.sections/text-form/text-form.component';

@Component({
  selector: 'app-etymological',
  standalone: true,
  templateUrl: './etymological.component.html',
  styleUrls: ['../roots-results.component.scss'],
  imports: [FormsModule, NgIf, NgClass,NgFor,TranslateModule,
    NgSelectModule, TextFormComponent,GroupByPipe]
})
export class EtymologicalComponent implements OnInit, OnChanges {

  @Input() rootId?: number;
  oldRootId: number = 0;
  IsReady: boolean = false;
  SummaryEtymologicalLexicalSheetList: ISummaryEtymologicalLexicalSheet[] = [];
  constructor(private _dictionaryService: DictionaryService,
    private _sharedFunctions: SharedFunctions,
    private _sharedLemmaComponentValues: SharedLemmaComponentValues) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.rootId === this.oldRootId || !this.rootId)
      return;
    else (this.rootId && this.rootId !== this.oldRootId)
    {
      this.IsReady = false;
      this.oldRootId = this.rootId;
      this.getSummaryEtymologicalLexicalSheet();
    }
  }

  getSummaryEtymologicalLexicalSheet() {
    this.SummaryEtymologicalLexicalSheetList = [];
    this._sharedLemmaComponentValues.CountEtmTab = 0;
    this._dictionaryService.GetSummaryEtymologicalLexicalSheetByRootId(this.oldRootId).subscribe(
      item => [this.SummaryEtymologicalLexicalSheetList = <ISummaryEtymologicalLexicalSheet[]>this._sharedFunctions.reFormateSheetList(item), this.onFinishRequest()]);
  }
  onFinishRequest(): void {
    if(!this.SummaryEtymologicalLexicalSheetList)
     return;
    this._sharedLemmaComponentValues.CountEtmTab = this.SummaryEtymologicalLexicalSheetList.length;
    this.IsReady = (this.SummaryEtymologicalLexicalSheetList.length > 0);
  }

}
