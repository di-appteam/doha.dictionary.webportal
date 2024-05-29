import { Routes } from '@angular/router';
import { BibliographyRoutes } from './app-pages/app.bibliography/app.bibliography-routing.module';
import { ChartsRoutes } from './app-pages/app.charts/app.charts-routing.module';
import { ContactUSRoutes } from './app-pages/app.contact-us/app.contact-us-routing.module';
import { ContentsRoutes } from './app-pages/app.contents/app.contents-routing';
import { CorpusRoutes } from './app-pages/app.corpus/app.corpus-routing.module';
import { DictionaryRoutes } from './app-pages/app.dictionary/app.dictionary-routing.module';
import { HomeRoutes } from './app-pages/app.home/app.home-routing';
import { UserRoutes } from './app-pages/app.user/app.user-routing.module';
import { UserGuideRoutes } from './app-pages/app.userguide/app-user-guide-routing.module';



  const routes: Routes = [{
  path: '',
  redirectTo: 'Home',
  pathMatch: 'full',
}];

export const combinedRoutes: Routes = [ ...HomeRoutes,...UserGuideRoutes,...ContentsRoutes,...BibliographyRoutes,...ChartsRoutes,...ContactUSRoutes,...CorpusRoutes,...DictionaryRoutes,...UserRoutes];


