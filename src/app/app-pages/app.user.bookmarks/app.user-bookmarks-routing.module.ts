import { Routes } from '@angular/router';
import { AuthGuard } from '../../app-shared/security/auth.guard';

export const BookmarksRoutes: Routes = [
  {
    path: 'bookmarks'
    , loadComponent: () =>
      import('./app-user-bookmarks/user-bookmarks.component').then((c) => c.UserBookmarksComponent)
    , canActivate: [AuthGuard]
  }];


