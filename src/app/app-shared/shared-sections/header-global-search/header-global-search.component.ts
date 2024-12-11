import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedConfiguration } from '../../services/config.service';
import { SharedRootComponentValues } from '../../services/root.general.service';

@Component({
  selector: 'app-header-global-search',
  standalone: true,
  imports: [ CommonModule ,NgSelectModule, FormsModule,
    TranslateModule],
  templateUrl: './header-global-search.component.html',
  styleUrl: './header-global-search.component.scss'
})
export class HeaderGlobalSearchComponent implements OnInit{
  searchWord = '';
  searchDropdownOptions: any[] = [];
  searchSelectedOption = 1;

  constructor(
    private _router: Router,
    public _sharedConfiguration: SharedConfiguration,
    private _sharedRootComponentValues: SharedRootComponentValues,
    private _translate: TranslateService) {

  }

  ngOnInit(): void {

    this._translate.get(["home.dictionary", "home.bibliographyintro", "home.corpusintro"]).subscribe(words => {
      this.searchDropdownOptions = [
        {
          text: words["home.dictionary"],
          value: 1
        },
        {
          text: words["home.bibliographyintro"],
          value: 2
        },
        {
          text: words["home.corpusintro"],
          value: 3
        },
      ];
      console.log(this.searchDropdownOptions);
    });

  }

  ngAfterViewInit(): void {
    this._sharedRootComponentValues.ResetSetting();
    this._sharedRootComponentValues.obsSearchWord.next(this._sharedRootComponentValues.searchWord);
  }


  search(): void {
    if (!this.searchWord || this.searchWord.length < 1)
      return;
    if (this.searchSelectedOption == 1)
      this._router.navigate([('/dictionary/' + this.searchWord)]);
    else if (this.searchSelectedOption == 2)
      this._router.navigate([('/bibliography/' + this.searchWord)]);
    else if (this.searchSelectedOption == 3)
      this._router.navigate([('/corpus/' + this.searchWord)]);

  }
}
