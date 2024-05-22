
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { IRoot } from '../../app-models/dictionary.model';
import { Setting } from './config.service';



@Injectable()
export class StoreService extends CookieService {


    //public RootList: IRoot[] = [];
    public SavedDictionarySearch : any[] = [];
    public SavedRootSearch: IRoot[] = [];
    public Version?: Setting;
    private savedDicKey = 'SavedDicKey';
    private savedRootDicKey = 'SavedRootDicKey';
    private savedRootListKey = 'SavedRootListKey';
    private savedSettingKey = 'SettingKey';
    private showIntroMessageKey = 'ShowIntroMessage';
    public AddSearchWord(word: string): void {
        var result = this.SavedDictionarySearch.filter(a => a == word);
        if (result.length > 0)
            return;
        if (this.SavedDictionarySearch.length >= 36)
            this.SavedDictionarySearch = this.SavedDictionarySearch.slice((this.SavedDictionarySearch.length - 35), this.SavedDictionarySearch.length);
        this.SavedDictionarySearch.push(word);
        this.AddToStore(this.savedDicKey, this.SavedDictionarySearch, true);
    }
    public GetAllSavedDicSearch() {
        this.GetAllSavedRootDicSearch();
        this.GetAllSearchForDic();
        return true;
    }

    private GetAllSearchForDic() {
        var data = this.GetByKey(this.savedDicKey);
        if (data && data != '')
            this.SavedDictionarySearch = data.split(',');
    }
    public AddSearchWordToRoot(root: IRoot): void {
        var result = this.SavedRootSearch.filter(a => a.rootId == root.rootId);
        if (result.length > 0)
            return;
        if (this.SavedRootSearch.length >= 36)
            this.SavedRootSearch = this.SavedRootSearch.slice((this.SavedRootSearch.length - 35), this.SavedRootSearch.length);
        this.SavedRootSearch.push(root);
        this.AddToStore(this.savedRootDicKey, JSON.stringify(this.SavedRootSearch), true);
    }
    private GetAllSavedRootDicSearch() {
        var data = this.GetByKey(this.savedRootDicKey);
        if (data && data != '')
            this.SavedRootSearch = JSON.parse(data);
    }

    /*public AddRootList(roots: IRoot[]): void {
        this.RootList = roots;
        this.AddToStore(this.savedRootListKey, JSON.stringify(this.RootList), true);
    }
    private GetAllSavedRoot() {
        var data = this.GetByKey(this.savedRootListKey);
        if (data && data != '')
            this.RootList = JSON.parse(data);
    }*/


    public AddSetting(version?: Setting): boolean {
        if(!version)
         return true;
        this.GetAllSavedSetting();
        if (this.Version && version.SettingValue == this.Version.SettingValue){
            //this.GetAllSavedRoot();
            return false;
        }
        //this.RootList = [];
        this.ClearAllLocalStorage();
        this.Version = version;
        this.AddToStore(this.savedSettingKey, JSON.stringify(this.Version), true);
        return true;
    }
    private GetAllSavedSetting() {
        var data = this.GetByKey(this.savedSettingKey);
        if (data && data != '')
            this.Version = JSON.parse(data);
    }

    public AddToStore(key: string, value: any, overwrite: boolean): boolean {
        if (!overwrite && this.check(key))
            return false;
        if (overwrite && this.check(key))
            localStorage.removeItem(key);
        localStorage.setItem(key, value);
        return true;
    }

    public GetByKey(key: string): string {
        return localStorage.getItem(key)??"";
    }

    private ClearStore(keys: string[]): void {
        for (var i = 0; i < keys.length; i++) {
            localStorage.removeItem(keys[i]);
        }
    }

    private ClearAllLocalStorage(){
        localStorage.clear();
        window.location.reload();
    }

}
