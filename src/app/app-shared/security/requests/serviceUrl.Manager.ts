
import {map} from 'rxjs/operators';

import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { SharedRootComponentValues } from '../../services/root.general.service';
import { StoreService } from '../../services/store.service';
import { SharedConfiguration } from '../../services/config.service';

@Injectable()
export class ServiceUrlManager {
    constructor(private _http: HttpService, private _sharedConfiguration: SharedConfiguration
        , private _storeService: StoreService) {

    }

    private BaseUrl = '/api/';

    private ServicesName = ['root/GetAll/',
        'lemma/',
        'SummaryLexicalSheet/GetAll/',
        'SummaryLexicalSheet/GetLexicalSheetDetailByRoot/',
        'SummaryLexicalSheet/GetLexicalsheetDetailByLemma/',
        'SummaryLexicalSheet/GetLexicalsheetDetailById/',
        'CarvingLexicalSheet/GetCarvingLexicalSheetByRootId/',
        'SummaryEtymologicalLexicalSheet/GetSummaryEtymologicalLexicalSheetByRootId/',
        'SummaryDocuments/GetDates/',
        'CarvingSourceABV/GetAll/',
        'CarvingSource/GetAll/',
        'SummaryCorpus/SearchInCorpus/',
        'SummaryLexicalSheet/SearchByLemmaAutoC/',
        'SummaryDocuments/GetAllDocumetnts/',
        'CarvingSource/GetAllDocumetnts/',
        'Charts/GetLemmasCountPerYears/',
        'Charts/GetLemmaCountPerYears/',
        'Sequence/GetNextSequence',
        'Sequence/GetPrevSequence',
        'Charts/GetCountsOfUsageLemmaPerYear',
        'Account/LoginExternal',
        'Account/Login',
        'Account/RegisterUser',
        'UserData/GetUserData',
        'Lookup/GetLatestWords/',
        'MostSearchedWord/GetMostSearchedLemma/',
        'MostSearchedWord/GetMostSearchedRoot/',
        'Account/ConfirmUserEmail/',
        'Account/ResetPasswordRequest/',
        'Account/ResetPassword/',
        'UserData/ChangePassword',
        'Files/GetFileByRootId/',
        'SummaryDocuments/GetReferenceCover?refId=',
        'root/GetRootAutoCom/',
        'root/GetRootUpPosition/',
        'root/GetRootDownPosition/',
        'Account/RefreshToken/',
        'Account/ActivateUserAccount/',
        'Account/ReSendActivationCode/',
        'UserBookmarks/GetBookmarkCounts',
        'UserBookmarks/GetLexialBookmarks',
        'UserBookmarks/GetDocumentBookmarks',
        'UserBookmarks/AddBookmark',
        'UserBookmarks/RemoveBookmark',
        'UserBookmarks/RemoveAllBookmarkByType',
        'UserBookmarks/GetCorpusBookmarks',
        'UserBookmarks/GetSearchCriteriaBookmarks',
        'WebsiteFeature/ContactUs',
    'UserActions/SendComment',
    'UserData/UpdateUserProfile',
    'UserData/GetProfileData',
    'EtymologicalLexicalSheet/GetEtymologicalLexicalSheetForLemma/',
    'WebsiteFeature/ValidateRecaptcha/',
    'UserActions/SendDictionaryComment',
    'Participant/GetGroups',
    'Participant/GetParticipantByGroupId',
    'Charts/GetLemmasCountPerDuration', ];

    public StartService() {
        // this._sharedConfiguration.validToken();
        return new Promise((resolve) => {
            const lookupRequest = this._http.get((this.BaseUrl + 'Lookup/GetAll/'));
            lookupRequest.pipe(map((response) => response))
                .subscribe(a =>
                    [
                        this._sharedConfiguration.AdditionalTags = a.LkpAdditionalTagList,
                        this._sharedConfiguration.SemanticList = a.LkpSemanticFieldList,
                        this._sharedConfiguration.AutherList = a.LkpAutherList.map((val:any) => ({
                          id: val,
                          name: val
                        })),
                        this._sharedConfiguration.SourceList = a.LkpSourceList,
                        this._sharedConfiguration.UserBookmarkList = a.UserBookmarkList ?  a.UserBookmarkList : [],
                        resolve(this._storeService.AddSetting(a.version))
                    ],
                    () => [resolve(this._storeService.AddSetting())]
                );
        });
    }
    public getServiceUrl(serviceId: number): string {
        if (serviceId < 0 || serviceId > (this.ServicesName.length - 1)) {
            return '';
        }
        return (this.BaseUrl + this.ServicesName[serviceId]);
    }
}
export enum ServicesIDs {
    GetRoot = 0,
    GetLemma = 1,
    SearchInLemma = 2,
    GetLexicalsheetDetailByRoot = 3,
    GetLexicalsheetDetailByLemma = 4,
    GetLexicalsheetDetailById = 5,
    GetCarvingLexicalSheetByRootId = 6,
    GetSummaryEtymologicalLexicalSheetByRootId = 7,
    GetSummaryDocumentDates = 8,
    GetAllCarvingSourceABV = 9,
    GetAllCarvingSource = 10,
    SearchInCorpus = 11,
    SearchByLemmaAutoC = 12,
    GetAllDocumetnts = 13,
    CarvingGetAllDocumetnts = 14,
    GetLemmasCountPerYears = 15,
    GetLemmaCountPerYears = 16,
    GetNextSequence = 17,
    GetPrevSequence = 18,
    GetCountsOfUsageLemmaPerYear = 19,
    LoginExternal = 20,
    Login = 21,
    RegisterUser = 22,
    GetUserData = 23,
    GetLatestWords = 24,
    GetMostSearchedLemma = 25,
    GetMostSearchedRoot = 26,
    // ConfirmUserEmail = 27,
    ResetPasswordRequest = 28,
    ResetPassword = 29,
    ChangePassword = 30,
    GetFileByRootId = 31,
    GetReferenceCover = 32,
    GetRootAutoCom = 33,
    GetRootUpPosition = 34,
    GetRootDownPosition = 35,
    RefreshToken = 36,
    ActivateUserAccount = 37,
    ReSendActivationCode = 38,
    GetBookmarkCounts = 39,
    GetLexialBookmarks = 40,
    GetDocumentBookmarks = 41,
    AddBookmark = 42,
    RemoveBookmark = 43,
    RemoveAllBookmarkByType = 44,
    GetCorpusBookmarks = 45,
    GetSearchCriteriaBookmarks = 46,
    ContactUs = 47,
    SendComment = 48,
    UpdateUserProfile = 49,
    GetProfileData = 50,
    GetEtymologicalLexicalSheetForLemma = 51,
    ValidateRecaptcha= 52,
    SendDictionaryComment= 53,
    GetParticipantGroups= 54,
    GetParticipantsByGroup= 55,
    GetLemmasCountPerDuration = 56,
}
