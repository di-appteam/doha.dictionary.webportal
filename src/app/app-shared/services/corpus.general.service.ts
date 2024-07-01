import { Subject } from "rxjs";
import { SearchSDModel, summarycorpusmodel } from "../../app-models/corpus.model";

export class SharedCorpusComponentValues {
    public obsCtrSearch = new Subject<SearchSDModel>();
    public obsStrSearch = new Subject<string>();
    public corpusSearchResult: Array<summarycorpusmodel> = [];
    public pNumber : number = 1;
    public TotalCount : number = 0;
    public resetCorpusComponent():void{
        this.pNumber = 1;
        this.TotalCount = 0;
        this.corpusSearchResult = [];
    }
}
