import { Routes } from '@angular/router';

  export const ContactUSRoutes: Routes = [
    {
      path: 'contact-us',
      loadComponent: () =>
        import('./app-contact-us/app-contact-us.component').then((c) => c.AppContactUsComponent)
    }];


