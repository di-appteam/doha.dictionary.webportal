import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { participantdata } from '../../../../app-models/participants.models';
import { DictionarySearchFormComponent } from '../../../../app-shared/shared-sections/dictionary-search-section/search-form.component';
import { RootSectionComponent } from '../../../../app-shared/shared-sections/root-section/root-section.component';
@Component({
  selector: 'app-participant-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule, TranslateModule,RootSectionComponent,DictionarySearchFormComponent],
  templateUrl: './participant-modal.component.html',
  styleUrls: ['./participant-modal.component.scss']
})
export class ParticipantModalComponent implements OnInit {

  public participantid: number = 0;
  public participant?: participantdata ;
  constructor(
    public bsModalRef: BsModalRef
  ) { }
  ngOnInit(): void {
    console.log(this.participant);
  }

}
