import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ChartsSharedVariables } from '../../../app-models/charts.model';
import { AppChartsResultComponent } from '../app.charts.sections/app-charts-result/app-charts-result.component';
import { AppChartsSearchComponent } from '../app.charts.sections/app-charts-search/app-charts-search.component';

@Component({
  selector: 'app-app-charts',
  standalone: true,
  imports: [
    AppChartsSearchComponent,
    AppChartsResultComponent],
  templateUrl: './app-charts.component.html',
  styleUrl: './app-charts.component.scss',
  providers:[ChartsSharedVariables]
})
export class AppChartsComponent implements OnInit {

  // lineChart
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public linelemmaChartData: Array<any> = [];
  public linelemmaChartLabels: Array<any> = [];
  public SearchWord: string = "";
  public isReady: boolean = false;
  public isLemmaReady: boolean = false;
  constructor( private meta: Meta) {
    this.meta.updateTag({name: 'title' , content: 'العرض الإحصائي'},"name='title'");
    this.meta.updateTag({name: 'og:title' , content: 'العرض الإحصائي'},"name='og:title'");
    this.meta.updateTag({name: 'twitter:title' , content: 'العرض الإحصائي'},"name='twitter:title'");
    this.meta.updateTag({name: 'description',content: 'توفر بوابة المعجم الإلكترونية خدمات إحصائية متنوعة. ترصد هذه الإحصاءات تواتر استعمال ألفاظ المعجم إلى غاية 200 هـ. كما توفر إمكانية البحث في المعجم والمدونة عن أي لفظ والحصول على الإحصائيات المتعلقة به. '},"name='description'");
    this.meta.updateTag({name: 'og:description' ,content: 'توفر بوابة المعجم الإلكترونية خدمات إحصائية متنوعة. ترصد هذه الإحصاءات تواتر استعمال ألفاظ المعجم إلى غاية 200 هـ. كما توفر إمكانية البحث في المعجم والمدونة عن أي لفظ والحصول على الإحصائيات المتعلقة به. '},"name='og:description'");
    this.meta.updateTag({name: 'twitter:description',content: 'توفر بوابة المعجم الإلكترونية خدمات إحصائية متنوعة. ترصد هذه الإحصاءات تواتر استعمال ألفاظ المعجم إلى غاية 200 هـ. كما توفر إمكانية البحث في المعجم والمدونة عن أي لفظ والحصول على الإحصائيات المتعلقة به. '},"name='twitter:description'");

    this.meta.updateTag({name: 'url',content: window.location.href},"name='url'");
    this.meta.updateTag({name: 'og:url',content: window.location.href},"name='og:url'");
    this.meta.updateTag({name: 'twitter:url',content: window.location.href},"name= 'twitter:url'");
  }

  ngOnInit() {

  }

}
