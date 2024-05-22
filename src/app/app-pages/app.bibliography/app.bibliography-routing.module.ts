import { Routes } from '@angular/router';


export const BibliographyRoutes: Routes = [
  {
    path: 'bibliography',
    loadComponent: () =>
      import('./app-bibliography/app-bibliography.component').then((c) => c.AppBibliographyComponent)
  }];
