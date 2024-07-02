import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SearchSDModel } from '../../../../../app-models/corpus.model';

@Component({
  selector: 'app-lemma-sequences-section',
  standalone: true,
  imports: [NgIf,NgClass,NgFor, FormsModule, TranslateModule],
  templateUrl: './lemma-sequences-section.component.html',
  styleUrls: ['./lemma-sequences-section.component.scss']
})
export class LemmaSequencesSectionComponent implements OnInit {


  public searchModal?: SearchSDModel;
  public lemmaValue:string = "";

  constructor(public seqModalRef: BsModalRef) { }

  ngOnInit() {

  }


}
