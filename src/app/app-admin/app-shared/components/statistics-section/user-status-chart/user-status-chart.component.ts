import { Component, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { ChartConfiguration, ChartData, ChartType, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the datalabels plugin
import Chart from 'chart.js/auto'; // Auto imports all required Chart.js modules
import { UserService } from '../../../services/user.service';

// Register the datalabels plugin
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-user-status-chart',
  standalone: true,
  imports: [MatDivider, MatButton, BaseChartDirective],
  templateUrl: './user-status-chart.component.html',
  styleUrls: ['./user-status-chart.component.scss'],
})
export class UserStatusChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  users: any[] = [];
  totalRecords = 0;

  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: number, ctx: any) => {
          if (ctx.chart.data.labels) {
            return `${ctx.chart.data.labels[ctx.dataIndex]}: ${value}`;
          }
          return `${value}`;
        },
        color: '#fff', // Set label color
      },
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [], // Labels will be dynamically populated
    datasets: [
      {
        data: [], // Data will be dynamically populated
        backgroundColor: ['#3E340C','#BFB286', '#ccaf41', '#806914',  '#735121'], // Colors for each status
      },
    ],
  };

  public pieChartType: ChartType = 'pie';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(1, 1000000, '').subscribe((data: any) => {
      this.users = data.Data;
      this.totalRecords = data.TotalCount;

      this.updateChart();
    });
  }

  updateChart(): void {
    // Initialize status counts
    let statusCounts: { [key: string]: number } = {
      'قيد الانتظار': 0,
      'نشط': 0,
      'محذوف': 0,
      'غير نشط': 0,
      'مقفل': 0,
    };

    // Aggregate user counts by status
    this.users.forEach((user) => {
      const statusText = this.userService.getStatusText(user.statusid);
      if (statusCounts.hasOwnProperty(statusText)) {
        statusCounts[statusText]++;
      }
    });

    // Filter out statuses with a count of 0
    statusCounts = Object.fromEntries(
      Object.entries(statusCounts).filter(([_, count]) => count > 0)
    );

    // Update pie chart data
    this.pieChartData.labels = Object.keys(statusCounts);
    this.pieChartData.datasets[0].data = Object.values(statusCounts);

    // Refresh chart
    this.chart?.update();
  }

}
