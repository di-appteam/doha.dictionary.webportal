import { Routes } from '@angular/router';

export const CorpusRoutes: Routes = [
  {
    path: 'corpus',
    loadComponent: () =>
      import('./app-corpus/app-corpus.component').then((c) => c.AppCorpusComponent)
  }];


