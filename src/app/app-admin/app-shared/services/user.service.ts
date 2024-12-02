import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { HttpService } from '../../../app-shared/security/requests/http.service';
import { ServiceUrlManager } from '../../../app-shared/security/requests/serviceUrl.Manager';
import { AccountService } from '../../../app-shared/services/account.service';
import { SharedConfiguration } from '../../../app-shared/services/config.service';
import { SharedCorpusComponentValues } from '../../../app-shared/services/corpus.general.service';
import { SharedService } from '../../../app-shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/UserData/GetAllUsers';

  constructor(private _http: HttpService, private _sharedService: SharedService,
    private http: HttpClient) {

}

getUsers(page: number = 1, pageSize: number = 20,filter: string = ''): Observable<any[]> {
  return this._http
    .get(`${this.apiUrl}?page=${page}&pageSize=${pageSize}&email=${filter}`) // No generics used here
    .pipe(
      map((data: any) => data as any[]), // Use `as` to cast the response to an array of `any`
      catchError((error: any) => this._sharedService.handleError(error))
    );
}


  updateUser(user: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  ////////////////////////////////////////////////

  // مساعدو الحالة
  getStatusText(statusId: number): string {
    switch (statusId) {
      case 1: return 'قيد الانتظار';
      case 2: return 'نشط';
      case 3: return 'محذوف';
      case 4: return 'غير نشط';
      case 5: return 'مقفل';
      default: return 'غير معروف';
    }
  }

  getStatusIcon(statusId: number): string {
    switch (statusId) {
      case 1: return 'hourglass_empty'; // قيد الانتظار
      case 2: return 'check_circle';   // نشط
      case 3: return 'delete';         // محذوف
      case 4: return 'pause_circle';   // غير نشط
      case 5: return 'lock';           // مقفل
      default: return 'help';          // غير معروف
    }
  }

  getStatusIconClass(statusId: number): string {
    switch (statusId) {
      case 2: return 'text-success';  // أخضر للنشط
      case 3: return 'text-danger';   // أحمر للمحذوف
      case 5: return 'text-warning';  // أصفر للمقفل
      default: return '';
    }
  }
}
