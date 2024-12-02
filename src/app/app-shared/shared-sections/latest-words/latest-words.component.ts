import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LatestWords } from '../../../app-models/shared.model';
import { SharedFunctions } from '../../services/config.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'latest-words',
  standalone: true,
  imports: [CommonModule,TranslateModule,RouterLink,RouterModule ],
  templateUrl: './latest-words.component.html',
  styleUrls: ['./latest-words.component.scss']
})
export class LatestWordsComponent implements OnInit {
  @Input() isAdmin?: boolean;
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
