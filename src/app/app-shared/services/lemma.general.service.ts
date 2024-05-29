
import { Subject } from 'rxjs';
import { SearchDictionaryModel, ISummaryLexicalSheet } from '../../app-models/dictionary.model';


export class SharedLemmaComponentValues {
    public lemmaPageSize = 20;
    public searchWord = '';
    public obsSearchWord = new Subject<string>();
    public obsReloadMostSearched = new Subject<boolean>();
    public _searchDictionaryModel: SearchDictionaryModel = new SearchDictionaryModel();
    //public obsCtrSearchWord = new Subject<string>();
    public obsCtrSearch = new Subject<SearchDictionaryModel>();
    public obsCtrSearchFromBM = new Subject<SearchDictionaryModel>();
    public acSummaryLexicalSheet: ISummaryLexicalSheet[] = [];
    public lexicalSheetList: Array<ISummaryLexicalSheet> = [];
    public ILexCasesList: Array<ILexCases> = [];
    public CountLexTab? : number;
    public CountEtmTab? : number;
    public CountCarvTab? : number;

    public pageNumber = 1;
    public isAutoComplate = false;
    // pager object
    public pager: any = {};
    public ResetSetting(): void {
        this.lemmaPageSize = 20;
        this.searchWord = '';
        this.isAutoComplate = false;
        this.pageNumber = 1;
        this.acSummaryLexicalSheet = [];
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
