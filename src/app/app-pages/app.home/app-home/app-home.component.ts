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
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasPermissionDirective } from '../../../app-shared/directive/permissions.directive';
import { LatestWordsComponent } from '../../../app-shared/shared-sections/latest-words/latest-words.component';
import { MostSearchedComponent } from '../../../app-shared/shared-sections/most-searched/most-searched.component';
import { StatisticsSectionComponent } from '../../../app-shared/shared-sections/statistics-section/statistics-section.component';
import {MatDividerModule} from '@angular/material/divider';
import { RootSectionComponent } from '../../../app-shared/shared-sections/root-section/root-section.component';
@Component({
  selector: 'app-app-home',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule, CarouselModule,MatDividerModule, TranslateModule,RootSectionComponent, HasPermissionDirective, MostSearchedComponent, LatestWordsComponent, StatisticsSectionComponent],

  templateUrl: './app-home.component.html',
  styleUrl: './app-home.component.scss'
})
export class AppHomeComponent implements OnInit {

  public windowWidth: number = 0;
  bsModalRef?: BsModalRef;
  public carouselOptions: OwlOptions = {
    items: 1,
    dots: true,
    loop: false,
    rtl: true,
    nav: false,
    rewind:true,
    mouseDrag: true,
    dotsData:false,
    responsive: {
      991: {
        items: 4,
        loop: false,
        mouseDrag: false,
        dots: true,
      }
    }

  };
  searchWord = '';
  searchDropdownOptions: any[] = [];
  searchSelectedOption = 1;
  constructor(
    private meta: Meta,
    private _router: Router,
    public _sharedConfiguration: SharedConfiguration,
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
  @HostListener('window:resize', ['$event']) windowScroll(e: any) {
    this.windowWidth = window.innerWidth;
    this.checkCarouselState();
  }
  checkCarouselState() {
    this.carouselOptions.loop = false; // this won't refresh the carousel
  }

  ngOnInit(): void {

    this._translate.get(["home.dictionary", "home.bibliographyintro", "home.corpusintro"]).subscribe(words => {
      this.searchDropdownOptions = [
        {
          text: words["home.dictionary"],
          value: 1
        },
        {
          text: words["home.bibliographyintro"],
          value: 2
        },
        {
          text: words["home.corpusintro"],
          value: 3
        },
      ];
      console.log(this.searchDropdownOptions);
    });
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

  search(): void {
    if (!this.searchWord || this.searchWord.length < 1)
      return;
    if (this.searchSelectedOption == 1)
      this._router.navigate([('/dictionary/' + this.searchWord)]);
    else if (this.searchSelectedOption == 2)
      this._router.navigate([('/bibliography/' + this.searchWord)]);
    else if (this.searchSelectedOption == 3)
      this._router.navigate([('/corpus/' + this.searchWord)]);

  }
  redirectTo(componant: string): void {
    if (!componant || componant.length < 1)
      return;
    this._router.navigate([('/' + componant)]);
  }

  scrollTop(event: any) {
    if (typeof window !== "undefined")
      window.scroll(0, 0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)

  }

}
