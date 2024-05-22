import { Injectable } from "@angular/core";

@Injectable()
export class LanguageService {
  constructor() {

  }


  public reWriteCitation(citation: string, citationType: number = 0): string {
    if (!citation.includes('cnvQCF2BSML') && (citationType == 2 || citationType == 3 || citationType == 4)) {
      const citationArr = citation.split('<br/>');
      let newCitation = '';
      if (citation.includes('***')) {
        // tslint:disable-next-line: max-line-length
        const calcMaxLArr = citation.replace('<span class=\'dark-red\'>', '').replace('</span>', '').split(' ').filter(a => a.trim() != '').join(' ').split(/<br\/>|\*\*\*/).map(a => this.normalize_text(a.trim()));
        const maxStrLength = calcMaxLArr.reduce(function (a, b) { return a.length > b.length ? a : b; }).length;
        for (let i = 0; i < citationArr.length; i++) {
          const subCitationArr = citationArr[i].split('***');
          if (subCitationArr[0]) {
            // tslint:disable-next-line: max-line-length
            newCitation += '<div class="poetry-row"><p class="paragraph"><span class="right">' + this.setKashida(subCitationArr[0].trim(), maxStrLength) + '</span>';
          }
          if (subCitationArr[1]) {
            newCitation += '<span class="left">' + this.setKashida(subCitationArr[1].trim(), maxStrLength) + '</span>' + '</p>' + '</div>';
          }
        }
      } else {
        // tslint:disable-next-line: max-line-length
        const maxStrLength = citation.replace('<span class=\'dark-red\'>', '').replace('</span>', '').split(' ').filter(a => a.trim() != '').join(' ').split('<br/>').map(a => this.normalize_text(a.trim())).reduce(function (a, b) { return a.length > b.length ? a : b; }).length;
        for (let i = 0; i < citationArr.length; i++) {
          if (i % 2 === 0) {
            // tslint:disable-next-line: max-line-length
            newCitation += '<div class="poetry-row"><p class="paragraph"><span class="right">' + this.setKashida(citationArr[i].trim(), maxStrLength) + '</span>';
          } else {
            newCitation += '<span class="left">' + this.setKashida(citationArr[i].trim(), maxStrLength) + '</span>' + '</p>' + '</div>';
          }
        }
      }
      citation = newCitation;
      /*citation = citation.replace(/\<br \/>\s\s\s\s\s\s\s\s\s/g, '</span><span class="left">');
      citation = citation.replace(/\<br \/>/g, '</span><span class="right">');
      citation = citation.replace(/\<span class=\"right\">/g, '</p><p class="paragraph left"><span class="right">');
      citation = "<p class=\"paragraph left\"><span class=\"right\">" + citation + "</span></p>";*/
    } else if (!citation.includes('cnvQCF2BSML')) {
      citation = '<div class="poetry-row"><p class=" text-center">' + citation + '</p></div>';
    }


    return citation;
  }
  public getShearArray(citation: string): string[] {
    if (citation.includes('***')) {
      return citation.split(/<br\/>|\*\*\*/).map(a => a.trim()).filter(String);
    } else {
      return citation.split('<br/>').map(a => a.trim()).filter(String);
    }
  }
  public reFormateSheetList(listForReformate: any[], searchType: number, config: SharedConfiguration): Object[] {
    for (let y = 0; y < listForReformate.length; y++) {
      if (listForReformate[y]['citation'] && (listForReformate[y]['citationType'] || listForReformate[y]['citationType'] == 0)) {
        // tslint:disable-next-line: max-line-length
        if (!listForReformate[y]['citation'].includes('width:0px; display:none;') && (listForReformate[y]['quranic'] == 1 || listForReformate[y]['citation'].includes('Q1') || listForReformate[y]['citation'].includes('q1') || listForReformate[y]['newformtype'] == 2)) {
          let repStr = String.fromCharCode(8205);
          const chartToReplace = String.fromCharCode(1620);
          repStr += '<span style=\'width:0px; display:none;\'></span>';
          repStr += chartToReplace;
          listForReformate[y]['citation'] = listForReformate[y]['citation'].replace(chartToReplace, repStr);
        }
        listForReformate[y]['citation'] = listForReformate[y]['citation'].replace(/(?:\r\n|\r|\n)/g, '<br/>');
        /*if (listForReformate[y]['citation'].indexOf('<br/> ') !== -1 || listForReformate[y]['citation'].includes('***')) {
          listForReformate[y]['citationType'] = 2;
        }*/
        if (!listForReformate[y]['citation'].includes('cnvQCF2BSML') && (listForReformate[y]['citationType'] == 2 || listForReformate[y]['citationType'] == 3 || listForReformate[y]['citationType'] == 4 || listForReformate[y]['citation'].includes('***'))) {
          listForReformate[y]['shearArray'] = this.getShearArray(this.reWriteStringWithStyle(listForReformate[y]['citation']));
        }
        listForReformate[y]['citation'] = this.reWriteStringWithStyle(listForReformate[y]['citation']);
      } else if (listForReformate[y]['citation']) {
        listForReformate[y]['citation'] = this.reWriteCitation(this.reWriteStringWithStyle(listForReformate[y]['citation']));
      }
      // to set bookmark value from saved list in sahred configuration class
      // tslint:disable-next-line: max-line-length
      if (config && config.UserBookmarkList && config.UserBookmarkList.length > 0 && (listForReformate[y]['IsBookMark'] || listForReformate[y]['IsBookMark'] === false)) {
        listForReformate[y]['IsBookMark'] = (config.UserBookmarkList.filter(a => a.bookmarktypeid == searchType && a.saveditemid == listForReformate[y]['ID']).length > 0);
      }
      if (listForReformate[y]['headCitation']) {
        listForReformate[y]['headCitation'] = this.reWriteStringWithStyle(listForReformate[y]['headCitation']);
      }
      if (listForReformate[y]['authorName']) {
        listForReformate[y]['authorName'] = this.reWriteStringWithStyle(listForReformate[y]['authorName']);
      }
      if (listForReformate[y]['source']) {
        listForReformate[y]['source'] = this.reWriteStringWithStyle(listForReformate[y]['source']);
      }
      if (listForReformate[y]['meaning']) {
        listForReformate[y]['meaning'] = this.reWriteStringWithStyle(listForReformate[y]['meaning']);
      }
      if (listForReformate[y]['translatedCitation']) {
        listForReformate[y]['translatedCitation'] = this.reWriteStringWithStyle(listForReformate[y]['translatedCitation']);
      }
      if (listForReformate[y]['remarks']) {
        listForReformate[y]['remarks'] = (listForReformate[y]['remarks'] == 'الملاحظات') ? '' : listForReformate[y]['remarks'];
      }
      listForReformate[y]['showTooltip'] = false;
      listForReformate[y]['openActions'] = false;
    }
    return listForReformate;
  }
  public reFormateCorpusList(listForReformate: any[]): Object[] {
    for (let y = 0; y < listForReformate.length; y++) {
      if (listForReformate[y].neighborContent) {
        listForReformate[y].neighborContentWithStyle = this.reWriteCorpusWithStyle(listForReformate[y].neighborContent);
        listForReformate[y].neighborContent = this.removeCorpusStyle(listForReformate[y].neighborContent);
      }
      if (listForReformate[y].documentNumericalHijri) {
        listForReformate[y].displayedDate = this.reWriteDateSheet(listForReformate[y].documentNumericalHijri, false);
      }
      listForReformate[y].IsExpanded = false;
    }
    return listForReformate;
  }
  public removeCorpusStyle(str: string): string {
    const array = str.split(' ');
    let isSpan = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].includes('@f')) {
        if (isSpan) {
          array[i] = array[i].replace(/\@f/g, ' </span>');
          isSpan = false;
        } else {
          const index = array[i].indexOf('@f');
          array[i] = array[i].substring(0, index) + '<span class=\'dark-red\'> ' + array[i].substring((index + 3), array[i].length);
          isSpan = true;
        }
        if (array[i].includes('@f')) {
          i--;
        }
      }

      if (array[i].includes('$cfO')) {
        array[i] = array[i].replace(/\$cfO/g, '<span class=\'dark-red\'> ');
        if (array[i].includes('***')) {
          array[i] = array[i].replace('***', '</span>***<span class=\'dark-red\'>');
        }
      }
      if (array[i].includes('$cfC')) {
        array[i] = array[i].replace(/\$cfC/g, ' </span>');
      }
    }
    str = array.join(' ');
    str = str.replace(/(?:\r\n|\r|\n)/g, '');
    str = str.replace(/EOL/g, '');
    str = str.replace(/BOD/g, '');
    str = str.replace(/EOD/g, '');
    return str;
  }
  public reWriteCorpusWithStyle(str: string): string {
    const array = str.split(' ');
    let isSpan = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].includes('@f')) {
        if (isSpan) {
          array[i] = array[i].replace(/\@f/g, ' </span>');
          isSpan = false;
        } else {
          const index = array[i].indexOf('@f');
          array[i] = array[i].substring(0, index) + '<span class=\'dark-red\'> ' + array[i].substring((index + 3), array[i].length);
          isSpan = true;
        }
        if (array[i].includes('@f')) {
          i--;
        }
      }
      if (array[i].includes('$cfO')) {
        array[i] = array[i].replace(/\$cfO/g, '<span class=\'dark-red\'> ');
        if (array[i].includes('***')) {
          array[i] = array[i].replace('***', '</span>***<span class=\'dark-red\'>');
        }
      }
      if (array[i].includes('$cfC')) {
        array[i] = array[i].replace(/\$cfC/g, ' </span>');
      }
    }
    str = array.join(' ');
    str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    str = str.replace(/EOL/g, '<br />');
    str = str.replace(/BOD/g, '');
    str = str.replace(/EOD/g, '');
    return str;
  }

  private reWriteStringWithStyle(str: string): string {
    str = str.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    if (str.endsWith('<br/>')) {
      const lastIndex = str.lastIndexOf('<br/>');
      str = str.substring(0, lastIndex);
    }
    const array = str.split(' ').filter(a => a.trim() != '');

    let isSpan = false;
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].trim();
      if (array[i].includes('$cfO')) {
        array[i] = array[i].replace(/\$cfO/g, '<span class=\'dark-red\'> ');
        if (array[i].includes('***')) {
          array[i] = array[i].replace('***', '</span>***<span class=\'dark-red\'>');
        }
      }
      if (array[i].includes('$cfC')) {
        array[i] = array[i].replace(/\$cfC/g, ' </span>');
      }
      if (array[i].includes('$spO')) {
        if (str.includes('$sw1C') || str.includes('$sw2C')) {
          array[i] = array[i].replace(/\$spO/g, '</span><span class=\'dark-red\'> ');
        } else {
          array[i] = array[i].replace(/\$spO/g, '<span class=\'dark-red\'> ');
        }
      }
      if (array[i].includes('$spC')) {
        array[i] = array[i].replace(/\$spC/g, ' </span>');
      }
      if (array[i].includes('@cf')) {
        if (isSpan) {
          array[i] = array[i].replace(/\@cf/g, ' </span>');
          isSpan = false;
        } else {
          const index = array[i].indexOf('@cf');
          array[i] = array[i].substring(0, index) + '<span class=\'dark-red\'> ' + array[i].substring((index + 3), array[i].length);
          isSpan = true;
        }
        if (array[i].includes('@cf')) {
          i--;
        }
      }
    }
    str = array.join(' ');
    if (str.includes('$sw1O')) {
      str = str.replace(/\$sw1O/g, '<span class=\'cnvTimeRomanB\'>');
      str += '</span>';
    }
    if (str.includes('$sw2O')) {
      str = str.replace(/\$sw2O/g, '<span class=\'cnvEstrangeloB\'>');
      str += '</span>';
    }
    if (str.includes('$sw3O')) {
      str = str.replace(/\$sw3O/g, '<span class=\'cnvEbrimaB\'>');
      str = str.replace(/\$sw3C/g, '</span>');
    }
    if (str.includes('$sw1C') || str.includes('$sw2C')) {
      str = str.replace(/\$sw1C/g, '<span class=\'cnvEbrima\'>');
      str = str.replace(/\$sw2C/g, '<span class=\'cnvEbrima\'>');
      str += '</span>';
    }
    /**/
    str = str.replace(/\$s10/g, '<span class=\'cnvOUHOD\'>#</span>');
    str = str.replace(/\$s11/g, '<span class=\'cnvOUHOD\'>&</span>');
    str = str.replace(/\$s12/g, '<span class=\'cnvOUHOD\'>^</span>');
    str = str.replace(/\$s1/g, '<span class=\'cnvAGA\'></span>');
    str = str.replace(/\$s2/g, '<span class=\'cnvAGA\'></span>');
    str = str.replace(/\$s3/g, '<span class=\'cnvAGA\'></span>');
    str = str.replace(/\$s4/g, '<span class=\'cnvAGA\'>~</span>');
    str = str.replace(/\$s5/g, '<span class=\'cnvOUHOD\'>></span>');
    str = str.replace(/\$s6/g, '<span class=\'cnvOUHOD\'><</span>');
    str = str.replace(/\$s7/g, '<span class=\'cnvOUHOD\'>}</span>');
    str = str.replace(/\$s8/g, '<span class=\'cnvOUHOD\'>{</span>');
    str = str.replace(/\$s9/g, '<span class=\'cnvOUHOD\'>@</span>');
    /**/
    str = str.replace(/\$Q1/g, '<span class=\'cnvQCF2BSML\'>ﱡ</span>');
    str = str.replace(/\$Q2/g, '<span class=\'cnvQCF2BSML\'>ﱠ</span>');

    str = str.replace(/\$afO/g, '');
    str = str.replace(/\$afC/g, '');
    return str;
  }
  private replaceAt = function (index : number, replacement:string) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
  };
  public reWriteDateSheet(date, isDeathDate: boolean): string {
    // tslint:disable-next-line: triple-equals
    const fChar = (isDeathDate == true) ? 'ن ' : '';
    if (Number(date) < 0) {
      return (fChar + (Number(date) * -1) + ' ق.هـ ');
    }
    const str = (fChar + Number(date) + ' هـ ');
    return str;
  }

  public removeLastSkonFromString(str: string): string {
    if (str.endsWith('\u0652')) {
      str = str.slice(0, (str.length - 1));
    }
    return str;
  }
  public highlightString(word: string, paragraph: string) {
    if (word == undefined || word == '') {
      return paragraph;
    }
    const str = paragraph.replace(new RegExp(word, 'gi'), match => {
      return '<span class="highlightText">' + match + '</span>';
    });
    return str;
  }

  private setKashida(orgStr: string, orgNOfKashida: number): string {
    return orgStr;
    /*
    var str = orgStr.replace("<span class='dark-red'>", "").replace("</span>", "");
    var strUnV = this.normalize_text(str);
    if (strUnV.length == orgNOfKashida)
        return orgStr;
    var nOfKashida = orgNOfKashida - strUnV.length;
    var alphapitecCharacter = ['ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'م', 'ن', 'ه', 'ي'];
    var strArr = str.split(' ');
    var idx = 3;
    var exChr = []
    for (var i = 0; i < strArr.length; i++) {
        idx = -1;
        if (strArr[i].length <= 2 && strArr.length > 1 && i != (strArr.length - 1))
            continue;
        for (var y = 0; y < strArr[i].length; y++) {
            if (alphapitecCharacter.includes(strArr[i][y])) {
                idx = 1 + y;
                break;
            }
        }
        if (idx < 0 && i != (strArr.length - 1))
            continue;
        if (idx < 0)
            idx = 1;
        orgStr = orgStr.replace(strArr[i], (strArr[i].slice(0, idx) + Array(nOfKashida).join("ـ") + strArr[i].slice(idx, (strArr[i].length - 1))));
        //strArr[i] = strArr[i].slice(0, idx) + Array(nOfKashida).join("ـ") + strArr[i].slice(idx ,(strArr[i].length - 1));
        break;
    }
    return orgStr;*/
  }

  public normalize_text(text: string): string {

    // remove special characters
    text = text.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g, '');

    // normalize Arabic
    text = text.replace(/(آ|إ|أ)/g, 'ا');
    text = text.replace(/(ة)/g, 'ه');
    text = text.replace(/(ئ|ؤ)/g, 'ء');
    text = text.replace(/(ى)/g, 'ي');

    // convert arabic numerals to english counterparts.
    const starter = 0x660;
    for (let i = 0; i < 10; i++) {
      text.replace(String.fromCharCode(starter + i), String.fromCharCode(48 + i));
    }

    return text;
  }
}
