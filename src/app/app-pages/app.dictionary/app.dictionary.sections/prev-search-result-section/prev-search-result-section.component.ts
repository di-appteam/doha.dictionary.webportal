import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IRoot } from '../../../../app-models/dictionary.model';
import { SharedRootComponentValues } from '../../../../app-shared/services/root.general.service';
import { StoreService } from '../../../../app-shared/services/store.service';

@Component({
  selector: 'prev-search-result-section',
  standalone: true,
  imports: [NgFor,NgIf,RouterLink,TranslateModule],
  templateUrl: './prev-search-result-section.component.html',
  styleUrls: ['./prev-search-result-section.component.scss']
})
export class PrevSearchResultSectionComponent implements OnInit {

  constructor(public _storeService: StoreService,private _sharedRootComponentValues : SharedRootComponentValues,private _router : Router) {

  }


  ngOnInit() {
  }

  onSelectRoot(root: IRoot): void {
    this._sharedRootComponentValues.SelectRoot(root, this._storeService);
    this._router.navigate(['/root/']);
  }
}
