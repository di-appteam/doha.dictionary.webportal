import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from '../../../app-shared/shared-sections/alert/alert.component';
import { UserService } from '../../app-shared/services/user.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AdminContainerComponent } from '../../app-shared/components/admin-container/admin-container.component';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../app-shared/security/requests/http.service';
import { SharedService } from '../../../app-shared/services/shared.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../app-shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, FormsModule, AlertComponent,AdminContainerComponent
    , RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers:[UserService,HttpService,SharedService,HttpClient]
})
export class UserListComponent implements OnInit {
  users = new MatTableDataSource<any>([]);
  private filterSubject = new Subject<string>();
  totalRecords: number = 0;
  pageSize: number = 20;
  currentPage: number = 1;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.filterSubject.pipe(debounceTime(300)).subscribe((filter) => {
      this.userService.getUsers(this.currentPage, this.pageSize, filter).subscribe((data : any) => {
        this.users.data = data.Data; // تعيين البيانات إلى مصدر جدول Angular Material
        this.totalRecords = data.TotalCount;
      });
    });

    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.currentPage, this.pageSize, '').subscribe((data : any) => {
      this.users.data = data.Data; // تعيين البيانات إلى مصدر جدول Angular Material
      this.totalRecords = data.TotalCount;
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterSubject.next(filterValue);
  }

  save(user: any) {
    this.userService.updateUser(user).subscribe(() => alert('تم تحديث المستخدم!'));
  }

  delete(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => this.loadUsers());
  }

  editUser(user: any): void {
    console.log('تعديل المستخدم:', user);
    // إضافة منطق التعديل هنا
  }

  deleteUser(userId: number): void {
    console.log('حذف المستخدم مع المعرف:', userId);
    // إضافة منطق الحذف هنا
  }

  unlockUser(user: any): void {
    console.log('فتح حساب المستخدم:', user);
    // إضافة منطق فتح الحساب هنا
  }

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

  // مربعات حوار التأكيد
  confirmEdit(user: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `هل أنت متأكد أنك تريد تعديل ${user.email}؟` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editUser(user);
      }
    });
  }

  confirmDelete(userId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'هل أنت متأكد أنك تريد حذف هذا المستخدم؟' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }

  confirmUnlock(user: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `هل أنت متأكد أنك تريد فتح حساب ${user.email}؟` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.unlockUser(user);
      }
    });
  }
}
