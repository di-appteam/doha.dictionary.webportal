interface BibliographySearchResultsData{
  name: string,
  description: string
}
export interface BibliographySearchResults {
  count: number,
  data: BibliographySearchResultsData[]
}

interface CorpusSearchResultsData{
  name: string,
  adjective: string,
  date: string
}
export interface CorpusSearchResults {
  count: number,
  data: CorpusSearchResultsData[]
}

interface DictionarySearchResultsData{
  name: string,
  adjective: string,
  root: string,
  date: string
}
export interface DictionarySearchResults {
  count: number,
  data: DictionarySearchResultsData[]
}

export const BookmarkType = {
   lexicalsheetID:  1,
   lemmaID:  2,
   referenceID:  3,
   sequenceID:  4,
   dictionarysearchmodelID:  5,
}


export class BookmarkParmModel {
  TypeId! : number;
  PageSize!: number;
  Page!: number;
}

// mock data
export const bibliographySearchResponse: BibliographySearchResults = {
  count: 50,
  data: [
    {
      name: "الأصمعيات اختيار الأصمعي ",
      description: "قريب بن علي بن أصمع   "
    },
    {
      name: "الأغاني",
      description: ""
    },
    {
      name: "الشعر والشعراء",
      description: "أبو محمد عبد الله بن مسلم بن قتيبة الدينوري..."
    },
  ]
}

export const corpusSearchResponse: CorpusSearchResults = {
  count: 50,
  data: [
    {
      name: "، والله على ما نقول شهيد ، وبما نحن عليه بصير «. قال أبو عبيدة : فلما تأهبت للنهوض ،",
      adjective: "لَقيط بن زُرارة الدّارميّ",
      date: "ع3‏ق.هـ‏=‏619‏‏م‏",
    },
    {
      name: "، والله على ما نقول شهيد ، وبما نحن عليه بصير «. قال أبو عبيدة : فلما تأهبت للنهوض ،",
      adjective: "لَقيط بن زُرارة الدّارميّ",
      date: "ع3‏ق.هـ‏=‏619‏‏م‏",
    },
    {
      name: "، والله على ما نقول شهيد ، وبما نحن عليه بصير «. قال أبو عبيدة : فلما تأهبت للنهوض ،",
      adjective: "لَقيط بن زُرارة الدّارميّ",
      date: "ع3‏ق.هـ‏=‏619‏‏م‏",
    },
    {
      name: "، والله على ما نقول شهيد ، وبما نحن عليه بصير «. قال أبو عبيدة : فلما تأهبت للنهوض ،",
      adjective: "لَقيط بن زُرارة الدّارميّ",
      date: "ع3‏ق.هـ‏=‏619‏‏م‏",
    }
  ]
}




export const dictionarySearchResults: DictionarySearchResults = {
  count: 50,
  data: [
    {
      name: "بَصِير",
      adjective: "[صفة]",
      root: "ب ص ر",
      date: "ع3‏ق.هـ‏=‏619‏‏م‏",
    },
    {
      name: "بَصِير بَصِير",
      adjective: "[مشبهة]",
      root: "ب ص ر",
      date: "ع3‏ق.هـ‏=‏619‏‏م‏",
    },
    {
      name: "بَصِير",
      adjective: "[صفة مشبهة]",
      root: "ب ص ر",
      date: "ع3‏ق.هـ‏=‏619‏‏م‏",
    },
    {
      name: "بَصِير",
      adjective: "[صفة مشبهة]",
      root: "ب ص ر",
      date: "ع3‏ق.هـ‏=‏619‏‏م‏",
    },
    {
      name: "بَصِير بَصِير",
      adjective: "[صفة مشبهة مشبهة]",
      root: "ب ص ر",
      date: "ع3‏ق.هـ‏=‏619‏‏م‏",
    }
  ]
}
