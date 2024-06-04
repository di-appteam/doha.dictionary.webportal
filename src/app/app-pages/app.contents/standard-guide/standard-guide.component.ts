
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Meta } from '../../../../../node_modules/@angular/platform-browser';
import { ScrollService } from '../../../app-shared/services/scroll.service';
import { DictionarySearchFormComponent } from '../../../app-shared/shared-sections/dictionary-search-section/search-form.component';
import { RootSectionComponent } from '../../../app-shared/shared-sections/root-section/root-section.component';

@Component({
  selector: 'app-standard-guide',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule, TranslateModule,RootSectionComponent,DictionarySearchFormComponent],
  templateUrl: './standard-guide.component.html',
  styleUrls: ['./standard-guide.component.scss']
})
export class StandardGuideComponent implements OnInit {

  constructor(private meta: Meta,public scrollService: ScrollService) {
    if (typeof window !== "undefined") {
    this.meta.updateTag({name: 'title',content: 'الدَّلِيلُ المِعياريُّ للمُعالَجَةِ والتَّحريرِ المُعجَميِّ'},"name='title'");
    this.meta.updateTag({name: 'og:title',content: 'الدَّلِيلُ المِعياريُّ للمُعالَجَةِ والتَّحريرِ المُعجَميِّ'},"name='og:title'");
    this.meta.updateTag({name: 'twitter:title',content: 'الدَّلِيلُ المِعياريُّ للمُعالَجَةِ والتَّحريرِ المُعجَميِّ'},"name='twitter:title'");
    this.meta.updateTag({name: 'description',content: 'يقدم الدليل المعياري للمعالجة والتحرير المعجمي الضوابط العلمية والمنهجية المعتمدة في صناعة معجم الدوحة التاريخي للغة العربية.وضعت الهيئة التنفيذية للمعجم هذه الضوابط بناء على الممارسة العملية للخبراء وعلى القرارات التي اتخذها المجلس العلمي، بعد مناقشات تفصيلية ودراسات معمقة.'},"name='description'");
    this.meta.updateTag({name: 'og:description',content: 'يقدم الدليل المعياري للمعالجة والتحرير المعجمي الضوابط العلمية والمنهجية المعتمدة في صناعة معجم الدوحة التاريخي للغة العربية.وضعت الهيئة التنفيذية للمعجم هذه الضوابط بناء على الممارسة العملية للخبراء وعلى القرارات التي اتخذها المجلس العلمي، بعد مناقشات تفصيلية ودراسات معمقة.'},"name='og:description'");
    this.meta.updateTag({name: 'twitter:description',content: 'يقدم الدليل المعياري للمعالجة والتحرير المعجمي الضوابط العلمية والمنهجية المعتمدة في صناعة معجم الدوحة التاريخي للغة العربية.وضعت الهيئة التنفيذية للمعجم هذه الضوابط بناء على الممارسة العملية للخبراء وعلى القرارات التي اتخذها المجلس العلمي، بعد مناقشات تفصيلية ودراسات معمقة.'},"name='twitter:description'");

    this.meta.updateTag({name: 'url',content: window.location.href},"name='url'");
    this.meta.updateTag({name: 'og:url',content: window.location.href},"name='og:url'");
    this.meta.updateTag({name: 'twitter:url',content: window.location.href},"name='twitter:url'");
    }
  }

  ngOnInit() {
  }

}

