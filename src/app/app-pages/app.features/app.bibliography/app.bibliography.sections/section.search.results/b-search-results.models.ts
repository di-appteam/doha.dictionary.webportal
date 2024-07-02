interface SearchResultsData{
  name: string,
  description: string
}
export interface SearchResults {
  count: number,
  data: SearchResultsData[]
}

export const SORRY: string = 'عـذرًا !';

export const AlertMessages = {
  SUCCCESS: (number: number) => `عدد نتائج البحث الحالي:<span class="bold">${number}</span>`,
  ERROR: (title?: string) => {
    return `${title ? '<span class="bold">'+title+'</span>': ''}
     لا توجد أي نتائج للبحث الحالي`
  }
};
export enum AlertEnum{
  SUCCCESS  = "SUCCCESS",
  ERROR     = "ERROR",
}

// mock data
export const searchResponse: SearchResults = {
  count: 50,
  data: [
    {
      name: "الأصمعيات اختيار الأصمعي ",
      description: "قريب بن علي بن أصمع   "
    },
    {
      name: "الأغاني",
      description: "أبو الفرج عليّ بن الحسين الأصفهانيّ أبو الفرج عليّ بن الحسين الأصفهانيّ (ت356هـ)...      "
    },
    {
      name: "الشعر والشعراء",
      description: "أبو محمد عبد الله بن مسلم بن قتيبة الدينوري..."
    },
  ]
}
