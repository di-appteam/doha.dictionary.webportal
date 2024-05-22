import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LatestWords } from '../../../app-models/shared.model';
import { SharedFunctions } from '../../services/config.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'latest-words',
  standalone: true,
  imports: [CommonModule,TranslateModule,RouterLink ],
  templateUrl: './latest-words.component.html',
  styleUrls: ['./latest-words.component.scss']
})
export class LatestWordsComponent implements OnInit {

  private sub?: Subscription;

  constructor(private _sharedService:SharedService,public _sharedFunctions:SharedFunctions) { }

  data?: Array<LatestWords>;

  ngOnInit() {

    this.sub = this._sharedService.GetLatestWords(1,4).subscribe(
      (words : any) => {
        this.data = words;
     });
  }

}
