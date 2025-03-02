import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserInfo } from '../../app-models/user-account.model';

enum NewFormLexicalSheetType {
  Crowds = 0,
  Language = 1,
  Quranic = 2
}
enum BookmarkType {
  lexicalsheet = 1,
  lemma = 2,
  reference = 3,
  sequence = 4,
  dictionarysearchmodel = 5
}

enum RemarkType {
  Root = 1,
  Lemma = 2,
  LemmaTag = 3,
  Citation = 4,
  AuthorName = 5,
  DateSheet = 6,
  Meaning = 7,
  Source = 8
}
@Injectable({
  providedIn: 'root'
})
export class GlobalConfigurationService {
  // Constants
  public readonly PageSize = 10;
  public readonly shareUrl = "https://www.dohadictionary.org/dictionary/";


  // Enumerated types
  public readonly NewFormLexicalSheetTypes = NewFormLexicalSheetType;
  public readonly bookmarkType = BookmarkType;
  public readonly RemarkType = RemarkType;

  // Other properties
  public pendingReq = false;
  public requests = 0;
  public activeMItem = 0;
  public documentsDates: number[] = [];
  public AdditionalTags: any[] = [];
  public SemanticList: any[] = [];
  public SourceList: any[] = [];
  public AutherList: any[] = [];
  public UserBookmarkList: any[] = [];
  public obsSelectedPart = new Subject<number>();
  public userInfo: UserInfo | null = null;

  constructor() {}

  public validToken(): boolean {
    try {
      return !!(localStorage.getItem('Token'));
      // var jwtHelperService = null;
      // if (!localStorage.getItem('Token'))
      // return;

      /*jwtHelperService = new JwtHelperService({
          tokenGetter: () => {
              return JSON.parse(localStorage.getItem('Token')).Value;
          }
      });*/
      // if (jwtHelperService.isTokenExpired()) {
      // localStorage.removeItem('Token');
      // this.userInfo = undefined;
      // }
      // return (!jwtHelperService.isTokenExpired());
    } catch (Error) {
return false;
    }
  }

}

