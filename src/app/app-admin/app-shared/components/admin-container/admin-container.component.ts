import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { HttpService } from '../../../../app-shared/security/requests/http.service';
import { SharedService } from '../../../../app-shared/services/shared.service';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-container',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
  providers:[HttpService,SharedService,HttpClient,UserService]
})
export class AdminContainerComponent {
  @Input() title: string = '';

  // Define menu items
  menuItems = [
    { label: 'لوحة تحكم', route: '/admin' },
    { label: 'قائمة المستخدمين', route: '/admin/users' },
    { label: 'قائمة المشاركين', route: '/admin/participants' },
    { label: 'إدارة التصنيفات', route: '/admin/manage-category' },
    { label: 'إدارة المحتوى', route: '/admin/manage-content' },
    { label: 'إدارة محتوى المعجم', route: '/admin/manage-dictionary-content' },
    { label: 'إدارة محتوى الموقع الاخباري', route: '/admin/manage-news-website-contents' }
  ];
}

