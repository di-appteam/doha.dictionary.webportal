import { Routes } from '@angular/router';

  export const UserGuideRoutes: Routes = [
    {
      path: 'user-guide',
      loadComponent: () =>
        import('./app-userguide/app-user-guide.component').then((c) => c.UserGuideComponent)
    }];



