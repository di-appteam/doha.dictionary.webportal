import { Subject } from "rxjs";
import { summarydocuments } from "../../app-models/bibliography.model";
import { SearchSDModel } from "../../app-models/corpus.model";

export class SharedBibliographyComponentValues {
    public obsCtrSearch = new Subject<SearchSDModel>();
    public obsStrSearch = new Subject<string>();
    public summarydocuments: summarydocuments[] = [];
    public pSize : number = 20;
}
