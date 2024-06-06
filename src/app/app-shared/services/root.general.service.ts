import { Subject } from 'rxjs';
import { StoreService } from './store.service';
import { IRoot } from '../../app-models/dictionary.model';
import { Injectable } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';


@Injectable()
export class SharedRootComponentValues {
    public RootPageSize = 15;
    public selectedRoot? : IRoot;
    public selectedPage = 1;
    public showGozorList = false;
    public searchWord = '';
    public obsSearchWord = new Subject<string>();
    public obsSearchListWord = new Subject<string>();
    public obsReloadMostSearched = new Subject<boolean>();
    public rootList: IRoot[] = [];
    public AllRootList: IRoot[] = [];
    // pager object
    public pager: any = {};
    public ResetSetting(): void {
        this.RootPageSize = 15;
        //this.selectedRootId = null;
        this.selectedPage = 1;
        this.showGozorList = false;
        this.searchWord = '';
        //this.rootList = [];
        // pager object
        //this.pager = {};
        this.obsSearchWord.next('');
        this.obsSearchListWord.next('');
    }
    public SelectRoot(root: IRoot, storeService: StoreService): void {
        if (!root)
            return;
        this.selectedRoot = root;
        this.searchWord = root.rootValue;
        setTimeout(() => this.showGozorList = false, 200);
        //this.obsSearchWord.next(root.rootValue);
    }

    public GetRootById(rootId: number): any {
        if (!rootId || !this.AllRootList || this.AllRootList.length == 0)
            return null;
        var root = this.AllRootList.filter(a => a.rootId == rootId);
        if (root.length == 0)
            return null;
        return root[0];
    }

}
