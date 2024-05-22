import { Routes } from '@angular/router';

export const DictionaryRoutes: Routes = [
  {
    path: 'dictionary',
    loadComponent: () =>
      import('./app-dictionary/app-dictionary.component').then((c) => c.AppDictionaryComponent)
  }];


