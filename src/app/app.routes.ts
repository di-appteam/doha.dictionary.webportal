import { Routes } from '@angular/router';
import { BibliographyRoutes } from './app-pages/app.bibliography/app.bibliography-routing.module';
import { ChartsRoutes } from './app-pages/app.charts/app.charts-routing.module';
import { ContactUSRoutes } from './app-pages/app.contact-us/app.contact-us-routing.module';
import { CorpusRoutes } from './app-pages/app.corpus/app.corpus-routing.module';
import { DictionaryRoutes } from './app-pages/app.dictionary/app.dictionary-routing.module';
import { HomeRoutes } from './app-pages/app.home/app.home-routing';
import { UserRoutes } from './app-pages/app.user/app.user-routing.module';



  const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
}];

export const combinedRoutes: Routes = [...routes, ...HomeRoutes,...BibliographyRoutes,...ChartsRoutes,...ContactUSRoutes,...CorpusRoutes,...DictionaryRoutes,...UserRoutes];


