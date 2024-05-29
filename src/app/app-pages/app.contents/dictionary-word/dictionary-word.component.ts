import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Meta } from '../../../../../node_modules/@angular/platform-browser';
import { DictionarySearchFormComponent } from '../../../app-shared/shared-sections/dictionary-search-section/search-form.component';
import { RootSectionComponent } from '../../../app-shared/shared-sections/root-section/root-section.component';

@Component({
  selector: 'app-dictionary-word',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule, TranslateModule,RootSectionComponent,DictionarySearchFormComponent],
  templateUrl: './dictionary-word.component.html',
  styleUrls: ['./dictionary-word.component.scss']
})
export class DictionaryWordComponent implements OnInit {

  constructor(private meta: Meta) {
    if (typeof window !== "undefined") {
    this.meta.updateTag({name: 'title',content: 'كلمة المعجم'},"name='title'");
    this.meta.updateTag({name: 'og:title',content: 'كلمة المعجم'},"name='og:title'");
    this.meta.updateTag({name: 'twitter:title',content: 'كلمة المعجم'},"name='twitter:title'");
    this.meta.updateTag({name: 'description',content: 'مرحبا بكم في البوابة الالكترونية لمعجم الدوحة التاريخي للغة العربية. نسعد بتفاعلكم البنّاء مع المواد المنشورة، تعديلا وإغناءً واقتراحا.'},"name='description'");
    this.meta.updateTag({name: 'og:description',content: 'مرحبا بكم في البوابة الالكترونية لمعجم الدوحة التاريخي للغة العربية. نسعد بتفاعلكم البنّاء مع المواد المنشورة، تعديلا وإغناءً واقتراحا.'},"name='og:description'");
    this.meta.updateTag({name: 'twitter:description',content: 'مرحبا بكم في البوابة الالكترونية لمعجم الدوحة التاريخي للغة العربية. نسعد بتفاعلكم البنّاء مع المواد المنشورة، تعديلا وإغناءً واقتراحا.'},"name='twitter:description'");

    this.meta.updateTag({name: 'url',content: window.location.href},"name='url'");
    this.meta.updateTag({name: 'og:url',content: window.location.href},"name='og:url'");
    this.meta.updateTag({name: 'twitter:url',content: window.location.href},"name='twitter:url'");
    }
  }

  ngOnInit() {
  }

}

