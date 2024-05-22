import { Routes } from '@angular/router';


  export const ChartsRoutes: Routes = [
    {
      path: 'chart',
      loadComponent: () =>
        import('./app-charts/app-charts.component').then((c) => c.AppChartsComponent)
    }];

