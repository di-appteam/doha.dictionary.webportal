/* Defines the product entity */
export interface IRoot {
    rootId: number;
    rootValue: string;
    rootValueUV: string;
    issplitted: number;
    inprogress: number;
    HasDocument: boolean;
}

export interface RemarksArgument {
  remarksargumentid: number;
  remarksargument1: string;
  typelexicalsheet: number;
  privilegeid: number;
  remarksargumenttagid: number;
}

/* Defines the product entity */
export interface INameddl {
    lemmaValue: string;
    index: number;
}

export interface ISummaryLexicalSheet {
    ID: number;
    rootId: number;
    lemmaId: number;
    referenceSourceReadingQuran: number;
    rootValue: string;
    lemmaValue: string;
    lemmaValueUV: string;
    lemmaTagValue: string;
    citation: string;
    meaning: string;
    authorName: string;
    source: string;
    additionalTag: string;
    dateSheet: string;
    dateSheetSolar: string;
    remarks: string;
    headCitation: string;
    quranicReading: string;
    quranic: boolean;
    isPublished: boolean;
    hasLemmaEtymology: boolean;
    referenceSourceReadingQuranStr: string;
    referenceSourcePage: string;
    referenceSourcePart: string;
    referenceSourceHaditNbr: string;
    referenceSourceIsParticularReadingQuran: string;
    citationSource: string;
    referenceSourceAyahNbr: string;
    confirmfinishedproofreadingdate: Date;
    newFormId: number;
    newFormValue: string;
    semanticFieldId: number;
    citationType: number;
    semanticFieldValue: string;
    ismeaning: boolean;
    issemantic: boolean;
    isnewform: boolean;
    isDeathDate: boolean;
    newformtype: number;
    MeaningCount: number;
    referencesourceid: number;
    parmId: number;
    hiddeLex: boolean;
    IsBookMark: boolean;
    hascover: boolean;
    istool: boolean;
    shearArray: string[];
    showTooltip: boolean;
    openActions: boolean;
    remarksargument: RemarksArgument[];
    additionalTagOrder: number;
    additionalTagGroup: number;
    verbaldate:string;
    referencesourcesubtitle:string;
    referencesourcesubauthor:string;
    referencesourcelastseen:string;
    referencesourceurl:string;
    referencesourcepublisheddate:string;
}


export interface ICarvingLexicalSheet {
    carvingLexicalSheetId: number;
    rootId: number;
    headwordTransliteration: string;
    additionalTag: string;
    verbalDate: string;
    verbalDateUV: string;
    numericalDate: number;
    citation: string;
    citationUV: string;
    meaning: string;
    meaningUV: string;
    translatedCitation: string;
    translatedCitationUV: string;
    signe: string;
    language: string;
    languageUV: string;
    languageGroup: string;
    languageGroupUV: string;
    languageScript: string;
    languageScriptUV: string;
    type: string;
    typeUV: string;
    originalLocation: string;
    originalLocationUV: string;
    currentLocation: string;
    currentLocationUV: string;
    source: string;
}



export interface UserDictionaryComment {
  ID: number;
  UserId: number;
  Name: string;
  Email: string;
  Description: string;
  LemmaValue: string;
  RootValue: string;
  Comment: string;
  Citation: string;
  AutherName: string;
  CitationDate: string;
  Reference: string;
  GeneralNote: string;
}
export interface ISummaryEtymologicalLexicalSheet {
    ID: number;
    rootId: number;
    languageId: number;
    etymologicalorder: number;
    meaning: string;
    meaningUV: string;
    languageForm: string;
    etymologicallexicalsheetId: number;
}


export interface IEtymologicalLexicalSheet {
  linguisticetymologylexicalsheetid: number;
  rootId: number;
  lemmaid: number;
  additionaltag: string;
  etymologylanguage: string;
  etymologysource: string;
  etymologyremarks: string;
}


export interface ISummaryLexicalSheetsGrouped {
    key: string;
    value: ISummaryLexicalSheet[];
}


export interface ISearchResultResponse {
    Data: ISummaryLexicalSheetsGrouped[];
    TotalCount: number;
}
export interface ISearchByLemmaResultResponse {
    Data: ISummaryLexicalSheet[];
    TotalCount: number;
}
export interface IRootResponse {
    Data: IRoot[];
    TotalCount: number;
    ActualPage: number;
    ReachTop: boolean;
    ReachEnd: boolean;
}

export interface IActiveTab {
    ParentId: number;
    ChildId: number;
    ChildType: number;
}

export class SearchDictionaryModel {
    constructor() {
        this.SearchWord = '';
        this.IsAdvancedSearch = false;
        this.IsCarving = false;
        this.IsEtymological = false;
        this.IsSemanticField = false;
        this.AutherValue = '';
    }
    SearchCriteriaType?:number;
    SearchWord: string;
    PageSize?: number;
    Page?: number;
    DateFrom?: number;
    DateTo?: number;
    IsHijri?: boolean;
    IsCarving: boolean;
    IsEtymological: boolean;
    IsSemanticField: boolean;
    AdditioalTag?: string;
    IsAdvancedSearch: boolean;
    SemanticFieldValue?: string;
    AutherValue: string;
    SourceValue?: string;
    public ValidForSearch(): boolean {
        return (this.SearchWord.trim() != '');
    }
}
