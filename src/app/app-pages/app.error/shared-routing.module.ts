import { Routes  } from '@angular/router';



export const ErrorRoutes: Routes = [
  {
    path: '404',
    loadComponent: () =>
      import('./notfound-error/notfound.component').then((c) => c.NotfoundComponent)
  }];
