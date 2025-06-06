import { Routes } from "@angular/router";
import { AdminRoutes } from "./app-admin/app-pages/app.admin-routing";
import { ContactUSRoutes } from "./app-pages/app.contact-us/app.contact-us-routing.module";
import { ContentsRoutes } from "./app-pages/app.contents/app.contents-routing";
import { ErrorRoutes } from "./app-pages/app.error/shared-routing.module";
import { BibliographyRoutes } from "./app-pages/app.features/app.bibliography/app.bibliography-routing.module";
import { ChartsRoutes } from "./app-pages/app.features/app.charts/app.charts-routing.module";
import { CorpusRoutes } from "./app-pages/app.features/app.corpus/app.corpus-routing.module";
import { DictionaryRoutes } from "./app-pages/app.features/app.dictionary/app.dictionary-routing.module";
import { HomeRoutes } from "./app-pages/app.home/app.home-routing";
import { BookmarksRoutes } from "./app-pages/app.user.bookmarks/app.user-bookmarks-routing.module";
import { UserRoutes } from "./app-pages/app.user/app.user-routing.module";




  const routes: Routes = [{
  path: '',
  redirectTo: 'Home',
  pathMatch: 'full',
}];

export const combinedRoutes: Routes = [ ...HomeRoutes,...AdminRoutes,...BookmarksRoutes,...ErrorRoutes, ...ContentsRoutes,...BibliographyRoutes,...ChartsRoutes,...ContactUSRoutes,...CorpusRoutes,...DictionaryRoutes,...UserRoutes];


