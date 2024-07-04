import { Routes } from '@angular/router';
import { AuthGuard } from '../../app-shared/security/auth.guard';

export const UserRoutes: Routes = [
 { path: 'forget-password',  loadComponent: () =>
import('./forget-password/forget-password.component').then((c) => c.ForgetPasswordComponent) },
{ path: 'signup',  loadComponent: () =>
import('./create-account-section/create-account.component').then((c) => c.CreateAccountComponent) },
{ path: 'activateaccount/:email/:code',  loadComponent: () =>
import('./activate-account/activate-account.component').then((c) => c.ActivateAccountComponent) },
{ path: 'resetpassword/:email/:code',  loadComponent: () =>
import('./reset-account-password/reset-account-password.component').then((c) => c.ResetAccountPasswordComponent) },
{ path: 'resetpassword/:status',  loadComponent: () =>
import('./reset-account-password/reset-account-password.component').then((c) => c.ResetAccountPasswordComponent) },
{ path: 'profile',  loadComponent: () =>
import('./app-user-account/app-user-account.component').then((c) => c.AppUserAccountComponent), canActivate: [AuthGuard] },
{ path: 'profile/:status',  loadComponent: () =>
import('./app-user-account/app-user-account.component').then((c) => c.AppUserAccountComponent), canActivate: [AuthGuard] },
{ path: 'changepassword',  loadComponent: () =>
import('./change-password/change-password.component').then((c) => c.ChangePasswordComponent), canActivate: [AuthGuard] }
];


