import { Routes } from '@angular/router';


  export const ChartsRoutes: Routes = [
    {
      path: 'charts',
      loadComponent: () =>
        import('./app.charts/app-charts.component').then((c) => c.AppChartsComponent)
    }];

