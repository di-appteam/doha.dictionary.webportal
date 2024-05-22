import { Injectable } from "@angular/core";

enum chartSTrList{
  Str1= "القرن 5 ق. هـ"
 ,Str2="القرن 4 ق. هـ"
 ,Str3="القرن 3 ق. هـ"
 ,Str4="القرن 2 ق. هـ"
 ,Str5="القرن 1ق. هـ"
 ,Str6="القرن 1 هـ"
 ,Str7="القرن 2 هـ"
 ,Str8="القرن 3 هـ"
 ,Str9="القرن 4 هـ"
 ,Str10="القرن 5 هـ"
 ,Str11="القرن 6 هـ"
 ,Str12="القرن 7 هـ"
 ,Str13="القرن 8 هـ"
 ,Str14="القرن 9 هـ"
 ,Str15="القرن 10 هـ"
 ,Str16="القرن 11 هـ"
 ,Str17="القرن 12 هـ"
 ,Str18="القرن 13 هـ"
 ,Str19="القرن 14 هـ"
 ,Str20="القرن 15 هـ"
 ,Str21="القرن 16 هـ"
 ,Str22="القرن 17 هـ"
 ,Str23="القرن 18 هـ"
 }

@Injectable()
export class ChartControlService {
  constructor() {

  }


  // chart label formation
  public myXAxisTickFormatting(val:any, selectedChartSizeOptions:any) {
    // tslint:disable-next-line: prefer-const
    let xLable = '';
    val += selectedChartSizeOptions;
    // tslint:disable-next-line: triple-equals
    let sNStr = (val == 0) ? -1 : (val < 0 ? (-1 * val) : val);
    // tslint:disable-next-line: max-line-length
    let fNStr = (val == 0) ? (selectedChartSizeOptions) : (val > 1) ? (val - (selectedChartSizeOptions)) : (-1 * (val - (selectedChartSizeOptions)));
    fNStr = (val >= 1) ? (fNStr + 1) : fNStr;
    sNStr = (val <= 0) ? (sNStr + 1) : sNStr;
    const fNStrIsN = (val <= 0);
    return xLable.concat(fNStr.toString(), (fNStrIsN == false ? ' هـ -' : ' ق.هـ -'), (sNStr == 0 ? '1' : sNStr.toString()), (val >= 1 ? ' هـ ' : ' ق.هـ '));
  }
  // chart label formation
  public myXAxisTickFormatting_new(val:any, selectedChartSizeOptions:any) {
    // tslint:disable-next-line: prefer-const
    let retunedStr = "";
    switch(val){
      case -500 :retunedStr=chartSTrList.Str1; break;
      case -400 :retunedStr=chartSTrList.Str2; break;
      case -300 :retunedStr=chartSTrList.Str3; break;
      case -200 :retunedStr=chartSTrList.Str4; break;
      case -100 :retunedStr=chartSTrList.Str5; break;
      case 1 :retunedStr=chartSTrList.Str6; break;
      case 101 :retunedStr=chartSTrList.Str7; break;
      case 201 :retunedStr=chartSTrList.Str8; break;
      case 301 :retunedStr=chartSTrList.Str9; break;
      case 401 :retunedStr=chartSTrList.Str10; break;
      case 501 :retunedStr=chartSTrList.Str11; break;
      case 601 :retunedStr=chartSTrList.Str12; break;
      case 701 :retunedStr=chartSTrList.Str13; break;
      case 801 :retunedStr=chartSTrList.Str14; break;
      case 901 :retunedStr=chartSTrList.Str15; break;
      case 1001 :retunedStr=chartSTrList.Str16; break;
      case 1101 :retunedStr=chartSTrList.Str17; break;
      case 1201 :retunedStr=chartSTrList.Str18; break;
      case 1301 :retunedStr=chartSTrList.Str19; break;
      case 1401 :retunedStr=chartSTrList.Str20; break;
    }
    return  retunedStr;
  }


}
