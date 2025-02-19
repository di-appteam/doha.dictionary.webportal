import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IRootResponse } from '../../../app-models/dictionary.model';
import { DictionaryService } from '../../services/dictionary.service';
import { SharedLemmaComponentValues } from '../../services/lemma.general.service';
import { SharedRootComponentValues } from '../../services/root.general.service';
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';
import { RootListComponent } from './root-list/root-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipe/FilterPipe';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
    selector: 'app-root-section',
    standalone: true,
    imports: [CommonModule,FormsModule ,TranslateModule ,RouterLink,NgScrollbarModule,RootListComponent,ScrollingModule],
    templateUrl: './root-section.component.html',
    styleUrls: ['./root-section.component.scss']
})
export class RootSectionComponent implements OnInit {
  // Get NgScrollbar reference
  // Unsubscriber for elementScrolled stream.
  private _scrollSubscription = Subscription.EMPTY;
    selectedRootId: number=0;
    searchRootWord = '';
    ReachTop: boolean = false;
    ReachEnd: boolean = false;
    subscription?: Subscription;
    acRootList = [];


    constructor(
        private _dictionaryService: DictionaryService,
        public _sharedRootComponentValues: SharedRootComponentValues,
        public _sharedLemmaComponentValues: SharedLemmaComponentValues,
        private ngZone: NgZone) { }

    ngOnInit(): void {
        this.subscription = this._sharedRootComponentValues.obsSearchWord.subscribe((word:any) => {
            if (word != '') 
                this._sharedLemmaComponentValues.ResetSetting();
            this.searchRootWord = word;
            this.searchInRootFromSr(false);
        });
    }

    //handle scroll event html==>  (psYReachEnd)="onScrollEvent($event)" (psYReachStart)="onScrollEvent($event)"
    onScrollEvent() {

        /*if (value.type == "ps-y-reach-end") {
            this.endLoading = true;
            this.GetRootDownPosition();
        }
        else if (value.type == "ps-y-reach-start") {
            this.startLoading = true;
            this.GetRootUpPosition();
        }*/
    }




    ShowGozor() {
        if (this.searchRootWord && this._sharedRootComponentValues.rootList.length > 0) {
            this._sharedRootComponentValues.obsSearchListWord.next(this.searchRootWord);
        }
        /*else if(this.searchRootWord){
           this.searchInRootFromSr(false);
        }*/
        this._sharedRootComponentValues.showGozorList = true;
    }
    HideGozor() {
        setTimeout(() => this._sharedRootComponentValues.showGozorList = false, 200);
    }

    searchInRootFromSr(showGozor: boolean = true): any {
        if (showGozor)
            this.ShowGozor();
        this._sharedRootComponentValues.rootList = [];
        if (this.searchRootWord == undefined || this.searchRootWord.trim().length < 1) {
            return ;
        }
        return this._dictionaryService.SearchInRootAutoC(this.searchRootWord.trim(), 1, 10)
            .subscribe((searchResult:any) => [this.SetRootList(searchResult)]);
    }
    private SetRootList(searchResult: IRootResponse) {
        this._sharedRootComponentValues.rootList = searchResult.Data;
        this.ReachTop = searchResult.ReachTop;
        this.ReachEnd = searchResult.ReachEnd;
        this.selectedRootId = 96;
        this._sharedRootComponentValues.obsSearchListWord.next(this.searchRootWord);
    }
}
