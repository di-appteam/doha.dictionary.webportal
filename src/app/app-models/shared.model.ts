export interface LatestWords {
    lemmaId: number;
    lemmaValue: string;
    additionalTag: string;
    dateSheet: number;
    dateSheetSolar: number;
    isDeathDate: boolean;
}
export interface MostSearchedWords {
    wordvalue: number;
    wordid: string;
}

interface SubNavData {
    title: string,
    href: string,
    display?:number,
    id:number,
}
export interface NavDataInterface {
    title: string,
    href: string,
    display?:number,
    id:number,
    subNav?: SubNavData[]
}
