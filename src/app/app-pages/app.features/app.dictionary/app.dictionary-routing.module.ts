import { Routes } from '@angular/router';

export const DictionaryRoutes: Routes = [
  {
    path: 'dictionary',
    loadComponent: () =>
      import('./app.dictionary.search/app-dictionary.component').then((c) => c.AppDictionaryComponent)
  },{
    path: 'dictionary/:word',
    loadComponent: () =>
      import('./app.dictionary.search/app-dictionary.component').then((c) => c.AppDictionaryComponent)
  },
  {
    path: 'root',
    loadComponent: () =>
    import('./app.dictionary.root/dictionary-root-details.component').then((c) => c.DictionaryRootDetailsComponent)
  },{
    path: 'root/:word',
    loadComponent: () =>
      import('./app.dictionary.root/dictionary-root-details.component').then((c) => c.DictionaryRootDetailsComponent)
  }];

/*
  const appRoutes: Routes = [
    { path: 'root', component: DictionaryRootDetailsComponent },
    { path: 'root/:word', component: DictionaryRootDetailsComponent },
    { path: 'user-comments', component: UserDicCommentsComponent , canActivate: [AuthGuard]}
  ];

*/
