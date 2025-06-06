
import { BehaviorSubject, Subject } from 'rxjs';
import { SearchDictionaryModel, ISummaryLexicalSheet } from '../../app-models/dictionary.model';


export class SharedLemmaComponentValues {
    public lemmaPageSize = 20;
    public obsReloadMostSearched = new Subject<boolean>();
    public _searchDictionaryModel= new BehaviorSubject<SearchDictionaryModel>(new SearchDictionaryModel());
    public fireSearchOperation =  new BehaviorSubject<boolean>(false);
    //public obsCtrSearch = new Subject<SearchDictionaryModel>();
    public acSummaryLexicalSheet: ISummaryLexicalSheet[] = [];
    public lexicalSheetList: Array<ISummaryLexicalSheet> = [];
    public ILexCasesList: Array<ILexCases> = [];
    public CountLexTab : number = 0;
    public CountEtmTab : number = 0;
    public CountCarvTab : number = 0;

    public pageNumber = 1;
    public isAutoComplate = false;
    // pager object
    public pager: any = {};
    public ResetSetting(): void {
        this.lemmaPageSize = 20;
        this.isAutoComplate = false;
        this.pageNumber = 1;
        this.acSummaryLexicalSheet = [];
        this._searchDictionaryModel.next(new SearchDictionaryModel());
    }
    public ResetTabsSetting(): void {
        this.CountLexTab = 0;
        this.CountEtmTab = 0;
        this.CountCarvTab = 0;
    }
}

export interface ILexCases {
    lexId: number;
    MeaningCount: number;
    NewFormCount: number;
    SemancticCount: number;
    Hidden: boolean;
}
