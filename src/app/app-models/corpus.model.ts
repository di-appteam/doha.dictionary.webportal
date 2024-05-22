export interface summarycorpusmodel {
    ID: number;
    sequenceId: number;
    position: number;
    wordId: number;
    documentId: number;
    rootId: number;
    lemmaId: number;
    senseId: number;
    documentNumericalHijri: number;
    rootValue: string;
    lemmaValue: string;
    neighborContent: string;
    neighborContentWithStyle: string;
    wordValue: string;
    wordValueUV: string;
    documentTitle: string;
    documentPublishedDate: string;
    documentVerbalDate: string;
    authorName: string;
    authorDate: string;
    displayedDate: string;
    IsExpanded: boolean;
    firsSequence: number;
    lastSequence: number;
    isFirstSeqEnded: boolean;
    isLastSeqEnded: boolean;
    IsBookMark: boolean;
}
export interface corpussearchResponse {
    Data: Array<summarycorpusmodel>;
    TotalCount: number;
}
export class SearchSDModel {
    constructor(word: string = '', lemmaId: number = 0, pageSize: number = 20) {
        this.searchWord = word;
        if (lemmaId != 0) {
            this.lemmaId = lemmaId;
            this.SearchByLemmaId = true;
        }
        else
            this.SearchByLemmaId = false;
        this.pageSize = pageSize;
    }
    public ValidForSearchByWord(): boolean {
        return (this.searchWord.trim() != '');
    }
    public ValidForSearchByLemmaId(): boolean {
        this.SearchByLemmaId ?? (this.lemmaId && this.lemmaId > 0);
        return this.SearchByLemmaId??false;
    }
    searchWord: string;
    pageSize: number;
    page?: number;
    lemmaId?: number;
    SearchByLemmaId?: boolean;
}
