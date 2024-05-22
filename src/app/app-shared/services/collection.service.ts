import { Injectable } from "@angular/core";

@Injectable()
export class LanguageService {
  constructor( ) {

  }
  public groupByArray(value: Array<any>, field: string): Array<any> {
    const groupedObj = value.reduce((prev, cur) => {
      if (!prev[cur[field]]) {
        prev[cur[field]] = [cur];
      } else {
        prev[cur[field]].push(cur);
      }
      return prev;
    }, {});

    return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
  }
  public orderByArray(value: Array<any>, field: string): Array<any> {
    return value.sort(function (a, b) {
      let fVal = a[field];
      let sVal = b[field];
      if (!isNaN(Number(fVal))) {
        fVal = Number(fVal);
        sVal = Number(sVal);
      }

      if (fVal < b[field]) {
        return -1;
      } else if (fVal > sVal) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
