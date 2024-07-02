import { NgIf, NgClass, NgFor } from "@angular/common";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Color, ChartType, ChartConfiguration, ChartEvent } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { Subscription } from "rxjs";
import { ChartsSharedVariables, lemmachartsmodel, ChartsCustomModelExc } from "../../../../app-models/charts.model";
import { HasPermissionDirective } from "../../../../app-shared/directive/permissions.directive";
import { AppChartsService } from "../../../../app-shared/services/charts.service";
import { ChartControlService } from "../../../../app-shared/services/chartscontrol.service";
import { SharedFunctions, SharedConfiguration } from "../../../../app-shared/services/config.service";
import { DictionaryService } from "../../../../app-shared/services/dictionary.service";


@Component({
  selector: 'app-app-charts-result',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass,TranslateModule,BaseChartDirective,NgFor,HasPermissionDirective,
    NgSelectModule],
  templateUrl: './app-charts-result.component.html',
  styleUrls: ['./app-charts-result.component.scss']
})
export class AppChartsResultComponent implements OnInit, AfterViewInit {
  ///////////////////////

 // lineChart
 chartData?: ChartConfiguration['data'] ;
 chartLabels?: any[] ;
 barChartLabels?: any[] ;
 lineChartLegend = true;
 public chartType: ChartType = 'bar';
 chartOptions = {
   responsive: true,
   legend: {
     display: false,
     labels: {
       display: false
     }
   }
 };
 dictionarystatistics: string = "";
 public yAxisLabel: string = "";
 yMeaningAxisLabel: string = "";
 yUsageAxisLabel: string = "";

  ////////////////////
  private sub!: Subscription;
  public noData: boolean = false;

  public chartSizeDropdownOptions = [
    {
      text: '50 سنة',
      value: 50
    },
    {
      text: '100 سنة',
      value: 100
    }
  ];
  public selectedChartTypeOptions = [
    {
      text: 'مخطط شريطي',
      value: 'bar'
    },
    {
      text: 'مخطط خطي',
      value: 'line'
    }
  ];
  public selectedChartSizeOptions: number = this.chartSizeDropdownOptions[0].value;
  public view: any[] = [700, 400];
  constructor(private _sharedFunctions : ChartControlService,public _sharedConfiguration: SharedConfiguration, private _translate: TranslateService, private _appChartsService: AppChartsService, private _dictionaryService: DictionaryService, public _chartsSharedVariables: ChartsSharedVariables) { }

  ngOnInit() {
    this._translate.get(["charts.dictionarystatistics", "charts.nooflexicalsheet", "charts.noofusage"]).subscribe(words => {
      this.dictionarystatistics = words["charts.dictionarystatistics"];
      this.yMeaningAxisLabel = words["charts.nooflexicalsheet"];
      this.yUsageAxisLabel = words["charts.noofusage"];
      this.GetAllStatistics();
    });
  }

  ngAfterViewInit(): void {
    this.sub = this._chartsSharedVariables.obsLemmaResult.subscribe(
     ( data :any  )=> {
        this.noData = (data.length == 0);
        this.prepareChartData(data);
      });

    this.sub = this._chartsSharedVariables.obsAllStatFire.subscribe(
      data => {
        this.GetAllStatistics();
      });

  }

  private GetAllStatistics(): void {
    this.noData = false;
    this.selectedChartSizeOptions = 100;
    this._appChartsService.GetLemmasCountPerDuration(100)
      .subscribe(searchResult => [this.prepareChartData(searchResult)],
        error => []);
  }


  private prepareChartData(dataAr: Array<lemmachartsmodel>): void {
    this.chartLabels = dataAr.map<any>(a=> this._sharedFunctions.myXAxisTickFormatting_new(a.name,selectedChartSizeOptions).toString());
    this.chartData =
    {
      datasets: [
        {
          data: dataAr.map(a=>a.value),
          label: 'إحصاءات',
          backgroundColor: '#ccaf41b0',
          borderColor: '#ccaf41',
          fill: 'origin',
          capBezierPoints:true
        }
      ],
      labels: this.chartLabels,
    };
    var selectedChartSizeOptions = 100;
    this._chartsSharedVariables.isLemmaReady = true;
  }




  generatColorScheme(nOfColor: number = 4) {
    let colors: String[] = ['#9edae5', '#17becf', '#dbdb8d', '#bcbd22', '#c7c7c7', '#7f7f7f', '#f7b6d2', '#e377c2', '#c49c94', '#8c564b', '#c5b0d5', '#9467bd', '#ff9896', '#d62728', '#98df8a', '#2ca02c', '#ffbb78', '#ff7f0e', '#aec7e8', '#1f77b4'];
    return colors.slice(0, (nOfColor + 1));
  }

  ShowToolTipModel(model: ChartsCustomModelExc) {
    var toolTipTemplate = "";
    toolTipTemplate = toolTipTemplate.concat(this._sharedFunctions.myXAxisTickFormatting(model.name,this.selectedChartSizeOptions), " : ", model.value.toString());
    return toolTipTemplate
  }
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

