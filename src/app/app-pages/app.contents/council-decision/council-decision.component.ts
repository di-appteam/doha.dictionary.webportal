
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Meta } from '../../../../../node_modules/@angular/platform-browser';
import { DictionarySearchFormComponent } from '../../../app-shared/shared-sections/dictionary-search-section/search-form.component';
import { RootSectionComponent } from '../../../app-shared/shared-sections/root-section/root-section.component';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import { ScrollService } from '../../../app-shared/services/scroll.service';
@Component({
  selector: 'app-council-decision',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule, TranslateModule,CdkScrollableModule,RootSectionComponent,DictionarySearchFormComponent],
  templateUrl: './council-decision.component.html',
  styleUrls: ['./council-decision.component.scss']
})
export class CouncilDecisionComponent implements OnInit {

  constructor(private meta: Meta,public scrollService: ScrollService) {
    if (typeof window !== "undefined") {
    this.meta.updateTag({name: 'title',content: 'قَرارات المجلس العلمي'},"name='title'");
    this.meta.updateTag({name: 'og:title',content: 'قَرارات المجلس العلمي'},"name='og:title'");
    this.meta.updateTag({name: 'twitter:title',content: 'قَرارات المجلس العلمي'},"name='twitter:title'");
    this.meta.updateTag({name: 'description',content: 'تعرّف على نتائج اجتماعات المجلس العلمي الدورية من الاجتماع الأول 25 مايو/أيار 2013 إلى الاجتماع الحادي عشر 8-9 مايو/ايار 2018 وعلى القرارات العلمية والتوصيات التي اتخذها بشأن مصادر معجم الدوحة التاريخي ومادته وبنية المداخل المعجمية وعناصرها.'},"name='description'");
    this.meta.updateTag({name: 'og:description',content: 'تعرّف على نتائج اجتماعات المجلس العلمي الدورية من الاجتماع الأول 25 مايو/أيار 2013 إلى الاجتماع الحادي عشر 8-9 مايو/ايار 2018 وعلى القرارات العلمية والتوصيات التي اتخذها بشأن مصادر معجم الدوحة التاريخي ومادته وبنية المداخل المعجمية وعناصرها.'},"name='og:description'");
    this.meta.updateTag({name: 'twitter:description',content: 'تعرّف على نتائج اجتماعات المجلس العلمي الدورية من الاجتماع الأول 25 مايو/أيار 2013 إلى الاجتماع الحادي عشر 8-9 مايو/ايار 2018 وعلى القرارات العلمية والتوصيات التي اتخذها بشأن مصادر معجم الدوحة التاريخي ومادته وبنية المداخل المعجمية وعناصرها.'},"name='twitter:description'");

    this.meta.updateTag({name: 'url',content: window.location.href},"name='url'");
    this.meta.updateTag({name: 'og:url',content: window.location.href},"name='og:url'");
    this.meta.updateTag({name: 'twitter:url',content: window.location.href},"name='twitter:url'");
    }
  }

  ngOnInit() {
  }

}
