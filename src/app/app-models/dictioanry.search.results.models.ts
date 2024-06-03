interface SearchResultsData{
  name: string,
  adjective: string,
  root: string,
  date: string
}
export interface SearchResults {
  count: number,
  data: SearchResultsData[]
}

export const SORRY: string = 'عـذرًا !';

export const AlertMessages = {
  SUCCCESS: (number: number) => `<span class="bold">${number}</span> نتيجة للبحث الحالي`,
  ERROR: (title?: string) => {
    return `${title ? '<span class="bold">'+title+'</span>': ''}
     لا يوجد أي نتائج للبحث الحالي`
  }
};
export enum AlertEnum{
  SUCCCESS  = "SUCCCESS",
  ERROR     = "ERROR",
}

