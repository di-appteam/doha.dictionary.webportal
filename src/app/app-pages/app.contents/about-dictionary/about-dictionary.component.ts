import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta, SafeHtml } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NavDataInterface } from '../../../app-models/shared.model';
import { RootSectionComponent } from '../../../app-shared/shared-sections/root-section/root-section.component';
import { DictionarySearchFormComponent } from '../../../app-shared/shared-sections/dictionary-search-section/search-form.component';

@Component({
  selector: 'about-dictionary',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule, TranslateModule,RootSectionComponent,DictionarySearchFormComponent],
  templateUrl: './about-dictionary.component.html',
  styleUrls: ['./about-dictionary.component.scss']
})
export class AboutDictionaryComponent implements OnInit {

  public aboutDictionaryHTML?: SafeHtml;
  private _domSanitizer: DomSanitizer;
  public navData: NavDataInterface[] = [
    {
      title: 'تعريف المعجم التاريخي',
      href: '#1',
      id: 1
    },
    {
      title: 'تعريف المعجم التاريخي',
      href: '#2',
      id: 2
    },
    {
      title: 'مادة المعجم',
      href: '#3',
      id: 1,
      subNav: [
        {
          title: 'الأسماء',
          href: '#4',
          id: 1
        },
        {
          title: 'الأسماء',
          href: '#5',
          id: 1
        },

      ]
    },
    {
      title: 'تعريف المعجم التاريخي',
      href: '#6',
      id: 1
    },
    {
      title: 'تعريف المعجم التاريخي',
      href: '#7',
      id: 1
    }
  ];
  constructor(private meta: Meta, private http: HttpClient, private domSanitizer: DomSanitizer) {

    if (typeof window !== "undefined") {
    this.meta.updateTag({name: 'title',content: 'مقدمة المعجم'},"name='title'");
    this.meta.updateTag({name: 'og:title',content: 'مقدمة المعجم'},"name='og:title'");
    this.meta.updateTag({name: 'twitter:title',content: 'مقدمة المعجم'},"name='twitter:title'");
    this.meta.updateTag({name: 'description',content: 'تعرّف على ميزات معجم الدوحة التاريخي للغة العربية وخصائصه وعلى المنهجية المتبعة في جمع الموارد اللغوية وبناء المداخل المعجمية.'},"name='description'");
    this.meta.updateTag({name: 'og:description',content: 'تعرّف على ميزات معجم الدوحة التاريخي للغة العربية وخصائصه وعلى المنهجية المتبعة في جمع الموارد اللغوية وبناء المداخل المعجمية.'},"name='og:description'");
    this.meta.updateTag({name: 'twitter:description',content: 'تعرّف على ميزات معجم الدوحة التاريخي للغة العربية وخصائصه وعلى المنهجية المتبعة في جمع الموارد اللغوية وبناء المداخل المعجمية.'},"name='twitter:description'");

    this.meta.updateTag({name: 'url',content: window.location.href},"name='url'");
    this.meta.updateTag({name: 'og:url',content: window.location.href},"name='og:url'");
    this.meta.updateTag({name: 'twitter:url',content: window.location.href},"name='twitter:url'");
  }
    this._domSanitizer = domSanitizer;
    this.http.get('https://www.dohadictionary.org/assets/template-files/about-dictionary.png', { responseType: 'text' }).subscribe(data => {
      console.log(data);
      this.aboutDictionaryHTML = this._domSanitizer.bypassSecurityTrustHtml(data)
    });
  }

  ngOnInit() {

  }

}
