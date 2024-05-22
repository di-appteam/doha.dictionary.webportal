import { Routes } from '@angular/router';

export const UserRoutes: Routes = [
  {
    path: 'my-account',
    loadComponent: () =>
      import('./app-user-account/app-user-account.component').then((c) => c.AppUserAccountComponent)
  }];


