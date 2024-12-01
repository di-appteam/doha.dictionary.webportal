import { Routes } from '@angular/router';
import { AuthAdminGuard } from '../app-shared/services/authAdmin.guard';

export const AdminRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthAdminGuard], // Protect all admin routes
    loadComponent: () =>
      import('./admin-dashboard/admin-dashboard.component').then((c) => c.AdminDashboardComponent),
  },
  {
    path: 'admin/users',
    canActivate: [AuthAdminGuard], // Protect all admin routes
    loadComponent: () =>
      import('./user-list/user-list.component').then((c) => c.UserListComponent),
  },
  {
    path: 'admin/participants',
    canActivate: [AuthAdminGuard], // Protect all admin routes
    loadComponent: () =>
      import('./participant-list/participant-list.component').then((c) => c.ParticipantListComponent),
  },
  {
    path: 'admin/manage-category',
    canActivate: [AuthAdminGuard], // Protect all admin routes
    loadComponent: () =>
      import('./category-management/category-management.component').then((c) => c.CategoryManagementComponent),
  },
  {
    path: 'admin/manage-content',
    canActivate: [AuthAdminGuard], // Protect all admin routes
    loadComponent: () =>
      import('./content-management/content-management.component').then((c) => c.ContentManagementComponent),
  },
  {
    path: 'admin/manage-dictionary-content',
    canActivate: [AuthAdminGuard], // Protect all admin routes
    loadComponent: () =>
      import('./dictionary-content-management/dictionary-content-management.component').then((c) => c.DictionaryContentManagementComponent),
  },
  {
    path: 'admin/manage-news-website-contents',
    canActivate: [AuthAdminGuard], // Protect all admin routes
    loadComponent: () =>
      import('./news-website-content-management/news-website-content-management.component').then((c) => c.NewsWebsiteContentManagementComponent),
  }];

