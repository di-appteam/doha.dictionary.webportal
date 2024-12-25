import { Component, HostListener, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SharedConfiguration } from '../../../app-shared/services/config.service';
import { SharedRootComponentValues } from '../../../app-shared/services/root.general.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from '../../../app-shared/directive/permissions.directive';
import {MatDividerModule} from '@angular/material/divider';
import { RootSectionComponent } from '../../../app-shared/shared-sections/root-section/root-section.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeaderGlobalSearchComponent } from '../../../app-shared/shared-sections/header-global-search/header-global-search.component';
import { CarouselImagesSectionComponent } from '../../../app-shared/shared-sections/carousel-images-section/carousel-images-section.component';
import { DynamicGridSectionComponent } from '../../../app-shared/shared-sections/dynamic-grid-section/dynamic-grid-section.component';
import { WordDaySectionComponent } from '../../../app-shared/shared-sections/word-day-section/word-day-section.component';
import {MatCardModule} from '@angular/material/card';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselSocialsSectionComponent } from '../../../app-shared/shared-sections/carousel-socials-section/carousel-socials-section.component';
import { CarouselServicesSectionComponent } from '../../../app-shared/shared-sections/carousel-services-section/carousel-services-section.component';
import { HeaderGlobalSearchOldVComponent } from '../../../app-shared/shared-sections/header-global-search-old-v/header-global-search-old-v.component';

export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule,CarouselServicesSectionComponent,
    CarouselSocialsSectionComponent,MatCardModule,MatDividerModule,NgbCarouselModule,MatGridListModule,
    CarouselImagesSectionComponent,WordDaySectionComponent,HeaderGlobalSearchOldVComponent,
    TranslateModule,RootSectionComponent, HasPermissionDirective,HeaderGlobalSearchComponent,DynamicGridSectionComponent],

  templateUrl: './app-home.component.html',
  styleUrl: './app-home.component.scss'
})
export class AppHomeComponent implements OnInit {
///////////////////////////////////// Test news slider
images:any[]=[
  {id:121,type: 'image' ,url:"/assets/images/should-remove/ARABIC-DAY-2024_000.jfif", title : "يُعلن معجم الدوحة التاريخي للغة العربية عن شروعه في نشر موادّه المعجمية من أقدم استعمالاتها في النقوش والنصوص حتى عصرنا الحاضر"},
  {id:122,type: 'image' ,url:"/assets/images/should-remove/AZMI_3.jfif", title : "يُعلن معجم الدوحة التاريخي للغة العربية عن شروعه في نشر موادّه المعجمية من أقدم استعمالاتها في النقوش والنصوص حتى عصرنا الحاضر"},
  {id:123,type: 'image' ,url:"/assets/images/should-remove/COVERFACEBOOK-2.png", title : "يُعلن معجم الدوحة التاريخي للغة العربية عن شروعه في نشر موادّه المعجمية من أقدم استعمالاتها في النقوش والنصوص حتى عصرنا الحاضر"}
]

customOptions: OwlOptions = {
  items: 1,
  dots: true,
  loop: false,
  rtl: true,
  nav: false,
  rewind:true,
  center: true,
  mouseDrag: true,
  dotsData:false,
  responsive: {
    991: {
      items: 3,
      loop: true,
      center: true,
      mouseDrag: true,
      dots: true,
    }
  }
}

/////////////////////////////////////
  public windowWidth: number = 0;
  bsModalRef?: BsModalRef;


  constructor(
    private meta: Meta,
    public _config: SharedConfiguration,
    private modalService: BsModalService,
    private _sharedRootComponentValues: SharedRootComponentValues,
    private _translate: TranslateService) {
    if (typeof window !== "undefined") {
      this.meta.updateTag({ name: 'title', content: 'معجم الدوحة التاريخي للغة العربية' }, "name='title'");
      this.meta.updateTag({ name: 'og:title', content: 'معجم الدوحة التاريخي للغة العربية' }, "name='og:title'");
      this.meta.updateTag({ name: 'twitter:title', content: 'معجم الدوحة التاريخي للغة العربية' }, "name='twitter:title'");
      this.meta.updateTag({ name: 'description', content: 'معجم الدوحة التاريخي للغة العربية معجم يسجل تاريخ استعمالات ألفاظ اللغة العربية بدلالاتها الأولى، وتاريخ تحولاتها البنيوية والدلالية، مع تحديد مستعمليها، وتعزيز ذلك بالشواهد الموثقة.' }, "name='description'");
      this.meta.updateTag({ name: 'og:description', content: 'معجم الدوحة التاريخي للغة العربية معجم يسجل تاريخ استعمالات ألفاظ اللغة العربية بدلالاتها الأولى، وتاريخ تحولاتها البنيوية والدلالية، مع تحديد مستعمليها، وتعزيز ذلك بالشواهد الموثقة.' }, "name='og:description'");
      this.meta.updateTag({ name: 'twitter:description', content: 'معجم الدوحة التاريخي للغة العربية معجم يسجل تاريخ استعمالات ألفاظ اللغة العربية بدلالاتها الأولى، وتاريخ تحولاتها البنيوية والدلالية، مع تحديد مستعمليها، وتعزيز ذلك بالشواهد الموثقة.' }, "name='twitter:description'");

      this.meta.updateTag({ name: 'url', content: window.location.href }, "name='url'");
      this.meta.updateTag({ name: 'og:url', content: window.location.href }, "name='og:url'");
      this.meta.updateTag({ name: 'twitter:url', content: window.location.href }, "name='twitter:url'");
    }
  }


  ngOnInit(): void {
    if (typeof window !== "undefined")
      this.windowWidth = window.innerWidth;
  }

  ngAfterViewInit(): void {
    this._sharedRootComponentValues.ResetSetting();
    this._sharedRootComponentValues.obsSearchWord.next(this._sharedRootComponentValues.searchWord);
  }

  openModalWithComponent() {
    //this.bsModalRef = this.modalService.show(CreateAccountComponent, { class: "modal-sm" });
    //this.bsModalRef.content.closeBtnName = 'Close';
  }



  scrollTop(event: any) {
    if (typeof window !== "undefined")
      window.scroll(0, 0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)

  }

}
