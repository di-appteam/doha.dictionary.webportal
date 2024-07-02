import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavDataInterface } from '../../../../app-models/shared.model';
import { DictionarySearchFormComponent } from '../../../../app-shared/shared-sections/dictionary-search-section/search-form.component';


@Component({
  selector: 'app-user-guide',
  standalone: true,
  imports: [NgClass,NgIf,NgFor,DictionarySearchFormComponent],
  templateUrl: './app-user-guide.component.html',
  styleUrls: ['./app-user-guide.component.scss']
})
export class UserGuideComponent implements OnInit {
  public navData: NavDataInterface[] = [
    {
      title: "تسجيل الدخول",
      href: "#1",
      id: 1
    },
    {
      title: "عن المعجم",
      href: "#2",
      id: 2
    },
    {
      title: "التصفح والبحث في المعجم",
      href: "#3",
      id: 3
    },
    {
      title: "البحث في المصادر",
      href: "#4",
      id: 4
    }, {
      title: "البحث في المدونة",
      href: "#5",
      id: 5
    }, {
      title: "الإحصاءات",
      href: "#6",
      id: 6
    }, {
      title: "الموقع الإخباري",
      href: "#7",
      id: 7
    }, {
      title: "التفاعل مع الجمهور",
      href: "#8",
      id: 8
    }
  ];
  public sideNavOpened: boolean = false;
  public selectedItem: NavDataInterface = {
    title: 'تسجيل الدخول',
    href: "#1",
    id: 1
  };
  constructor(private meta:Meta) {
    if (typeof window !== "undefined") {
    this.meta.updateTag({name: 'title',content: 'دليل الاستعمال'},"name='title'");
    this.meta.updateTag({name: 'og:title',content: 'دليل الاستعمال'},"name='og:title'");
    this.meta.updateTag({name: 'twitter:title',content: 'دليل الاستعمال'},"name='twitter:title'");
    this.meta.updateTag({name: 'description',content: 'للاطلاع على الدليل المصوّر لاستعمال البوابة الالكترونية لمعجم الدوحة التاريخي وكيفية الاستفادة من خدمات البحث والتصفح والإحصاءات وغيرها.'},"name='description'");
    this.meta.updateTag({name: 'og:description',content: 'للاطلاع على الدليل المصوّر لاستعمال البوابة الالكترونية لمعجم الدوحة التاريخي وكيفية الاستفادة من خدمات البحث والتصفح والإحصاءات وغيرها.'},"name='og:description'");
    this.meta.updateTag({name: 'twitter:description',content: 'للاطلاع على الدليل المصوّر لاستعمال البوابة الالكترونية لمعجم الدوحة التاريخي وكيفية الاستفادة من خدمات البحث والتصفح والإحصاءات وغيرها.'},"name='twitter:description'");
    this.meta.updateTag({name: 'url',content: window.location.href},"name='url'");
    this.meta.updateTag({name: 'og:url',content: window.location.href},"name='og:url'");
    this.meta.updateTag({name: 'twitter:url',content: window.location.href},"name='twitter:url'");
    }
  }

  ngOnInit() {
  }
  toggleSideNav() {
    this.sideNavOpened = !this.sideNavOpened;
  }
  closeSideNav() {
    this.sideNavOpened = false;
  }
  selectItem(item: NavDataInterface) {
    this.closeSideNav();
    this.selectedItem = item;
  }

}
