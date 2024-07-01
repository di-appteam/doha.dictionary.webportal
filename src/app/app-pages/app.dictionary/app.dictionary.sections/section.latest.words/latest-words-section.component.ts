import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LatestWords } from '../../../../app-models/shared.model';
import { SharedService } from '../../../../app-shared/services/shared.service';

@Component({
  selector: 'latest-words-section',
  standalone: true,
  imports: [NgFor,RouterLink,TranslateModule],
  templateUrl: './latest-words-section.component.html',
  styleUrls: ['./latest-words-section.component.scss']
})
export class LatestWordsSectionComponent implements OnInit {

  private sub?: Subscription;

  constructor(private _sharedService:SharedService) { }

  data?: Array<LatestWords>;


  ngOnInit() {

    this.sub = this._sharedService.GetLatestWords(1,5).subscribe(
      words => {
        this.data = words;
     });

  }

}
