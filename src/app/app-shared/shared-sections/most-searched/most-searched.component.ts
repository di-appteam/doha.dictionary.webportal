import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MostSearchedWords } from '../../../app-models/shared.model';
import { SharedService } from '../../services/shared.service';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'most-searched',
  standalone: true,
  imports: [CommonModule,TranslateModule ,RouterLink,MatChipsModule],
  templateUrl: './most-searched.component.html',
  styleUrls: ['./most-searched.component.scss']
})
export class MostSearchedComponent implements OnInit {
  private sublemma?: Subscription;
  public lemmadata: Array<MostSearchedWords>= [];
  constructor(private _sharedService:SharedService) { }

  ngOnInit() {
    this.sublemma = this._sharedService.GetMostSearchedWords(1,36).subscribe(
      (words:any) => {
        this.lemmadata = words;
     });
  }

}
