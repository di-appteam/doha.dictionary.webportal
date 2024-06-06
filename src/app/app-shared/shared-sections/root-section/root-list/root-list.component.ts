import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewChecked, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, Input, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbar,NgScrollbarExt, NgScrollbarModule } from 'ngx-scrollbar';
import { Subscription } from 'rxjs';
import { IRoot } from '../../../../app-models/dictionary.model';
import { FilterPipe } from '../../../pipe/FilterPipe';
import { DictionaryService } from '../../../services/dictionary.service';
import { SharedLemmaComponentValues } from '../../../services/lemma.general.service';
import { SharedRootComponentValues } from '../../../services/root.general.service';
import { StoreService } from '../../../services/store.service';
import { NgScrollReached } from 'ngx-scrollbar/reached-event';

@Component({
    selector: 'app-root-list',
    standalone: true,
    imports: [FormsModule,TranslateModule ,RouterLink,FilterPipe,NgClass,NgIf,NgFor,NgScrollbarModule,NgScrollReached],
    templateUrl: './root-list.component.html',
    styleUrls: ['./root-list.component.scss']
})
export class RootListComponent implements OnInit, OnChanges, AfterViewChecked {
    @Input() selectedRootId: number = 0;
    @Input() ReachEnd: boolean = false;
    @Input() ReachTop: boolean = false;
    @ViewChild(NgScrollbar, { static: true }) scrollbarRef?: NgScrollbar;
    @ViewChild('selected') selectedRootSection?: ElementRef;
    subscription?: Subscription;
    endLoading: boolean = false;
    startLoading: boolean = false;


    constructor(
        //private _cdr: ChangeDetectorRef,
        private _dictionaryService: DictionaryService,
        public _sharedRootComponentValues: SharedRootComponentValues,
        public _sharedLemmaComponentValues: SharedLemmaComponentValues,
        private _storeService: StoreService,
        private _router: Router) { }

    ngOnInit(): void {
        this._sharedRootComponentValues.obsSearchListWord.subscribe((word :string)=> {
            if (word != '')
                this._sharedLemmaComponentValues.obsSearchWord.next('');

            this.searchInRoot(word);
        });
    }
    ngAfterViewChecked(): void {
        // Since we know the list is not going to change
        // let's request that this component not undergo change detection at all
        //this._cdr.detach();
    }
    ngOnChanges(values:any) {

    }
    //handle scroll event html==>  (psYReachEnd)="onYReachEnd($event)"
    onYReachEnd($value:any) {
        if (this._sharedRootComponentValues.rootList && this._sharedRootComponentValues.rootList.length > 0) {
        }
    }

    private setRootData(searchResult: IRoot[]): void {
        this._sharedRootComponentValues.rootList = searchResult;
        //this._sharedRootComponentValues.selectedRootId = this.selectedRootId;
        //if (this.selectedRootId && this.selectedRootId > 0) {
        //    this._sharedRootComponentValues.SelectRoot(this._sharedRootComponentValues.selectedRootId, this._storeService);
        //}
        this.ScrollToItem();
    }
    private getRootData() {
        /* if (this._storeService.RootList.length > 0)
             return this.setRootData(this._storeService.RootList);
         this._dictionaryService.SearchInRoot(this._sharedRootComponentValues.searchWord.replace(/ /g, ''), this._sharedRootComponentValues.selectedPage)
             .subscribe(searchResult => [this.setRootData(searchResult.Data), this._storeService.AddRootList(searchResult.Data)],
                 error => [this._sharedRootComponentValues.rootList = []]);*/
    }
    searchInRoot(word:string): void {
        if (!this._sharedRootComponentValues.rootList || this._sharedRootComponentValues.rootList.length == 0)
            return;
        let selectedRoots:IRoot[] = this._sharedRootComponentValues.rootList.filter(a => a.rootValue.startsWith(word) || a.rootValueUV.startsWith(word) || a.rootValue.includes(("/ " + word)) || a.rootValueUV.includes(("/ " + word)) || a.rootValue.endsWith(("/" + word)) || a.rootValueUV.endsWith(("/" + word)));
        if ((!selectedRoots || selectedRoots.length == 0) && (this._sharedRootComponentValues.rootList.length == 0))
            return;
        let selectedRoot:IRoot =  this._sharedRootComponentValues.rootList[0];
        if (selectedRoots && selectedRoots.length > 0)
          selectedRoot = selectedRoots[0];
        this.selectedRootId = selectedRoot.rootId
        if (!selectedRoot  && selectedRoot["issplitted"] == 0)
            return;
        this.ScrollToItem();
    }
    GetRootDownPosition(): void {
      this.endLoading = true;
      var rootId = this._sharedRootComponentValues.rootList[(this._sharedRootComponentValues.rootList.length - 1)].rootId;
      this._dictionaryService.GetRootDownPosition(rootId, 10)
          .subscribe((searchResult:any) => [
              this._sharedRootComponentValues.rootList = this._sharedRootComponentValues.rootList.concat(searchResult.Data),
              this.endLoading = false,
              this.ReachEnd = searchResult.ReachEnd//,
              //setTimeout(() => this._sharedRootComponentValues.perfectScrollbar.directiveRef.scrollToBottom(), 200)
          ]);
  }
  GetRootUpPosition(): void {
      this.startLoading = true;
      var rootId = this._sharedRootComponentValues.rootList[0].rootId;
      this._dictionaryService.GetRootUpPosition(rootId, 10)
          .subscribe((searchResult:any) => [
              this._sharedRootComponentValues.rootList = searchResult.Data.concat(this._sharedRootComponentValues.rootList),
              this.startLoading = false,
              this.ReachTop = searchResult.ReachTop]);
  }

    searchValidation(word: string): boolean {
        if (this._sharedRootComponentValues.searchWord == word.replace(/ /g, '')) {
            return false;
        }
        this._sharedRootComponentValues.selectedPage = 1;
        if (this._sharedRootComponentValues.searchWord == '') {
            this.selectedRootId = 0;
        }
        return true;
    }
    onSelectRoot(root: IRoot): void {
        this._sharedRootComponentValues.SelectRoot(root, this._storeService);
        var parm = root.rootValue.replace("/","-");
        this._router.navigate(['/root/'+parm]);
        //setTimeout(() => this._sharedRootComponentValues.showGozorList = false, 500);
    }
    private ScrollToItem(): void {
        setTimeout(() => {
            if (!this.scrollbarRef || !this.selectedRootSection)
                return;
            let documentItem = document.getElementsByClassName('gozor-scroll-container');
            let targetItem = document.getElementsByClassName('selected');
            if (targetItem.length > 0)
             this.scrollbarRef.scrollToElement(this.selectedRootSection);
            else
             this.scrollbarRef.scrollTo({ top: (0 - 20), duration: 200 })
        });
    }
    // Treat the instructor name as the unique identifier for the object
    trackByID(index:number, item: IRoot) {
        return index;
    }

    onScrollbarUpdate(): void {
      if (!this.scrollbarRef || !this.selectedRootSection)
          return ;

       const targetItem = document.getElementsByClassName('selected') as HTMLCollectionOf<HTMLElement>;
       this.scrollbarRef.scrollTo({top : (targetItem['0'].offsetTop - 20), duration : 200});
       //if(targetItem['0'] && targetItem['0']["offsetTop"])
       //this.scrollbarRef.scrollToElement(this.selectedRootSection,);
    }
}
