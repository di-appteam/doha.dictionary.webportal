import { Subject } from "rxjs";
import { SearchSDModel, summarydocuments } from "../../app-models/bibliography.model";

export class SharedBibliographyComponentValues {
    public obsCtrSearch = new Subject<SearchSDModel>();
    public obsStrSearch = new Subject<string>();
    public summarydocuments: summarydocuments[] = [];
    public pSize : number = 20;
}
