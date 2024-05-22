import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { lemmachartsmodel } from '../../../app-models/charts.model';
import { AppChartsService } from '../../services/charts.service';
import { ChartControlService } from '../../services/chartscontrol.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'statistics-section',
  standalone: true,
  imports: [CommonModule,TranslateModule,RouterLink,BaseChartDirective ],
  templateUrl: './statistics-section.component.html',
  styleUrls: ['./statistics-section.component.scss']
})
export class StatisticsSectionComponent implements OnInit {
 ////////////////////

 isBrowser: boolean = false;
 // lineChart
lineChartData?: ChartConfiguration['data'] ;
lineChartLabels?: any[] ;
lineChartLegend = true;
public lineChartType: ChartType = 'bar';
chartOptions = {
  responsive: true,
  legend: {
    display: false,
    labels: {
      display: false
    }
  }
};
  constructor( private _appChartsService: AppChartsService,private sharedFunctions :ChartControlService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.GetAllStatistics();
  }
  private GetAllStatistics(): void {
    this._appChartsService.GetLemmasCountPerDuration(100)
      .subscribe((searchResult: Array<lemmachartsmodel>) => [this.prepareChartData(searchResult)]);
  }
  private prepareChartData(dataAr: Array<lemmachartsmodel>): void {
    this.lineChartLabels = dataAr.map<any>(a=> this.sharedFunctions.myXAxisTickFormatting_new(a.name,selectedChartSizeOptions).toString());

    this.lineChartData =
    {
      datasets: [
        {
          data: dataAr.map(a=>a.value),
          label: 'Series A',
          backgroundColor: '#ccaf41',
          borderColor: '#ccaf41',
          fill: 'origin',
        }
      ],
      labels: this.lineChartLabels,
    };
    var selectedChartSizeOptions = 100;}

    // events
   /* chartClicked(e: any): void {
      console.log('click', e);
    }

    chartHovered(e: any): void {
      console.log('hover', e);
    }*/
    public chartClicked({
      event,
      active,
    }: {
      event?: ChartEvent;
      active?: object[];
    }): void {
      console.log(event, active);
    }

    public chartHovered({
      event,
      active,
    }: {
      event?: ChartEvent;
      active?: object[];
    }): void {
      console.log(event, active);
    }
}
