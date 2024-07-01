export interface summarydocuments {
    id:number;
    title: string;
    generaldescription: string;
    publicationdescription: string;
    referencesourceid: number;
    source_cover_id: number;
    IsBookMark:boolean;
}
export interface carvingsource {
    carvingSourceId: number;
    source: string;
}
export interface carvingsourceabv {
    carvingSourceAbvId: number;
    abreviation: string;
    description: string;
}
export interface summarydocumentsModel {
    documenttitle: string;
    publishedDate: string;
    authorname: string;
    summarydocumentlist: Array<summarydocuments>;
}
export interface carvingsourceResponse {
    Data: Array<carvingsource>;
    TotalCount: number;
}
export interface carvingsourceabvResponse {
    Data: Array<carvingsourceabv>;
    TotalCount: number;
}
export interface summarydocumentsResponse {
    Data: Array<summarydocuments>;
    TotalCount: number;
}
export class SearchSDModel {
    constructor(title: string = '') {
        this.documenttitle = title;
        this.authorname = '';
        this.publicationdescription = '';
        this.sourceType = 1;
        this.orderBy = 1;
        this.IsAdvancedSearch = false;
        this.IsHijri = false;
    }
    public ValidForSearch(): boolean {
        return (this.authorname.trim() != '' || this.documenttitle.trim() != '' || this.sourceType != null);
    }
    documenttitle: string;
    authorname: string;
    publicationdescription: string;
    sourceType: number;
    orderBy: number;
    DateFrom?: number;
    DateTo?: number;
    IsHijri: boolean;
    IsAdvancedSearch: boolean;
}
