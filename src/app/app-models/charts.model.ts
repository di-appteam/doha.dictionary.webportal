import { Subject } from "rxjs";

export interface lemmachartsmodel {
    name: number;
    value: number;
}

export interface ChartsCustomModel {
    TextValue: string;
    GroupedByValueTxt: string;
    GroupedByValue: number;
    CountValue: number;
}

export interface ChartsCustomModelExc extends ChartsCustomModel{
    name: string;
    value: number;
}

export class ChartsSharedVariables{
    public obsLemmaResult = new Subject<ChartsCustomModelExc[]>();
    public obsAllStatFire = new Subject<boolean>();
    public isLemmaReady : boolean = false;
    public selectedResourcesOption : number = 1;
}
