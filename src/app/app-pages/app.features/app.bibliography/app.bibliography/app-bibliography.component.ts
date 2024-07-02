import { AfterViewInit, Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HasPermissionDirective } from '../../../../app-shared/directive/permissions.directive';
import { SharedBibliographyComponentValues } from '../../../../app-shared/services/bibliography.general.service';
import { BibliographyService } from '../../../../app-shared/services/bibliography.service';
import { SearchFormComponent } from '../app.bibliography.sections/section.search.form/search-form.component';
import { SearchResultsComponent } from '../app.bibliography.sections/section.search.results/b-search-results.component';

@Component({
  selector: 'app-app-bibliography',
  standalone: true,
  imports: [
    SearchFormComponent,
    SearchResultsComponent,
  HasPermissionDirective],
  templateUrl: './app-bibliography.component.html',
  styleUrl: './app-bibliography.component.scss',
  providers:[SharedBibliographyComponentValues,BibliographyService]
})
export class AppBibliographyComponent implements AfterViewInit {

  private sub?: Subscription;


  constructor(private meta: Meta,public _sharedBibliographyComponentValues: SharedBibliographyComponentValues, public _route: ActivatedRoute) {
    if (typeof window !== "undefined") {
    this.meta.updateTag({name: 'title',content:'البحث في مصادر المعجم'},"name='title'");
    this.meta.updateTag({name: 'og:title',content: 'البحث في مصادر المعجم'},"name='og:title'");
    this.meta.updateTag({name: 'twitter:title',content: 'البحث في مصادر المعجم'},"name='twitter:title'");
    this.meta.updateTag({name: 'description',content: 'ببليوغرافيا معجم الدَّوحة هي قاعدة بيانات المعلومات الببليوغرافيَّة لمصادر نصوص المُدوَّنة اللُّغويَّة للمُعجم. يمكنكم البحث المتقدم في هذه المصادر والاطلاع على : عناوين الوثائق، وأسماء أصحابها ومُصنِّفيها، وتواريخهم، ومعلومات النَّشر المُصاحبة لكلّ مصدرٍ.'},"name='description'");
    this.meta.updateTag({name: 'og:description',content: 'ببليوغرافيا معجم الدَّوحة هي قاعدة بيانات المعلومات الببليوغرافيَّة لمصادر نصوص المُدوَّنة اللُّغويَّة للمُعجم. يمكنكم البحث المتقدم في هذه المصادر والاطلاع على : عناوين الوثائق، وأسماء أصحابها ومُصنِّفيها، وتواريخهم، ومعلومات النَّشر المُصاحبة لكلّ مصدرٍ.'},"name='og:description'");
    this.meta.updateTag({name: 'twitter:description',content: 'ببليوغرافيا معجم الدَّوحة هي قاعدة بيانات المعلومات الببليوغرافيَّة لمصادر نصوص المُدوَّنة اللُّغويَّة للمُعجم. يمكنكم البحث المتقدم في هذه المصادر والاطلاع على : عناوين الوثائق، وأسماء أصحابها ومُصنِّفيها، وتواريخهم، ومعلومات النَّشر المُصاحبة لكلّ مصدرٍ.'},"name='twitter:description'");

    this.meta.updateTag({name: 'url',content: window.location.href},"name='url'");
    this.meta.updateTag({name: 'og:url',content: window.location.href},"name='og:url'");
    this.meta.updateTag({name: 'twitter:url',content: window.location.href},"name= 'twitter:url'");
  }
}


  ngAfterViewInit(): void {
    this.sub = this._route.params.subscribe(
      (params : any) => {
        if (params.word && params.word.length > 0 && params.word != '') {
          this.meta.updateTag({name: 'title',content:("البحث في مصادر المعجم بكلمة " + params.word)},"name='title'");
          this.meta.updateTag({name: 'og:title',content:("البحث في مصادر المعجم بكلمة " + params.word)},"name='og:title'");
          this.meta.updateTag({name: 'twitter:title',content:("البحث في مصادر المعجم بكلمة " + params.word)},"name='twitter:title'");
          this._sharedBibliographyComponentValues.obsStrSearch.next(params.word);
          return;
        }
      });
  }

}
