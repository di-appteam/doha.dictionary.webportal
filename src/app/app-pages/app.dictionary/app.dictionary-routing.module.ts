import { Routes } from '@angular/router';

export const DictionaryRoutes: Routes = [
  {
    path: 'dictionary',
    loadComponent: () =>
      import('./app-dictionary/app-dictionary.component').then((c) => c.AppDictionaryComponent)
  },{
    path: 'dictionary/:word',
    loadComponent: () =>
      import('./app-dictionary/app-dictionary.component').then((c) => c.AppDictionaryComponent)
  }];

/*
  const appRoutes: Routes = [
    { path: 'root', component: DictionaryRootDetailsComponent },
    { path: 'root/:word', component: DictionaryRootDetailsComponent },
    { path: 'user-comments', component: UserDicCommentsComponent , canActivate: [AuthGuard]}
  ];

*/
