import { Routes } from '@angular/router';

export const CorpusRoutes: Routes = [
  {
    path: 'Corpus',
    loadComponent: () =>
      import('./app-corpus/app-corpus.component').then((c) => c.AppCorpusComponent)
  }];


