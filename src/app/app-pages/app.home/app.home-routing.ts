import { Routes } from '@angular/router';

export const HomeRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./app-home/app-home.component').then((c) => c.AppHomeComponent)
  }];

