import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
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
  imports: [CommonModule, TranslateModule, RouterLink, BaseChartDirective],
  templateUrl: './statistics-section.component.html',
  styleUrls: ['./statistics-section.component.scss']
})
export class StatisticsSectionComponent implements OnInit {
  @Input() isAdmin?: boolean;

  // Browser Check
  isBrowser: boolean = false;

  // Chart Configuration
  public barCharData?: ChartConfiguration['data'];
  public barCharLabels: string[] = [];
  public barCharLegend: boolean = true;
  public barCharType: ChartType = 'bar';

  // Chart Options
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        display:false
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'العصر', // Add a meaningful title for X-axis
        },
      },
      y: {
        title: {
          display: true,
          text: 'العدد', // Add a meaningful title for Y-axis
        },
      },
    },
  };

  constructor(
    private _appChartsService: AppChartsService,
    private _sharedFunctions: ChartControlService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.fetchStatisticsData();
    }
  }

  /**
   * Fetches the statistics data and prepares the chart.
   */
  private fetchStatisticsData(): void {
    const selectedChartSizeOptions = 100; // Use a constant or dynamic value if required
    this._appChartsService
      .GetLemmasCountPerDuration(selectedChartSizeOptions)
      .subscribe((searchResult: lemmachartsmodel[]) => {
        this.prepareChartData(searchResult, selectedChartSizeOptions);
      });
  }

  /**
   * Prepares the chart data based on the fetched results.
   * @param dataArray Array of statistics data.
   * @param selectedChartSizeOptions Number of data points to display.
   */
  private prepareChartData(dataArray: lemmachartsmodel[], selectedChartSizeOptions: number): void {
    this.barCharLabels = dataArray.map((item) =>
      this._sharedFunctions.myXAxisTickFormatting_new(item.name, selectedChartSizeOptions).toString()
    );

    this.barCharData = {
      datasets: [
        {
          data: dataArray.map((item) => item.value),
          label: 'إحصاءات',
          backgroundColor: '#ccaf41',
          borderColor: '#ccaf41',
          fill: 'origin', // Better compatibility for fill options
        },
      ],
      labels: this.barCharLabels,
    };
  }

  /**
   * Handles chart click events.
   * @param event Chart click event object.
   * @param active Active elements on the chart.
   */
  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log('Chart clicked:', event, active);
  }

  /**
   * Handles chart hover events.
   * @param event Chart hover event object.
   * @param active Active elements on the chart.
   */
  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log('Chart hovered:', event, active);
  }
}
