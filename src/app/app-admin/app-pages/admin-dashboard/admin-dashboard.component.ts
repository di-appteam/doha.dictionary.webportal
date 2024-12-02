import { Component } from '@angular/core';
import { StatisticsSectionComponent } from '../../../app-shared/shared-sections/statistics-section/statistics-section.component';
import { AdminContainerComponent } from '../../app-shared/components/admin-container/admin-container.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { UserStatusChartComponent } from '../../app-shared/components/statistics-section/user-status-chart/user-status-chart.component';
import { MostSearchedComponent } from '../../../app-shared/shared-sections/most-searched/most-searched.component';
import { LatestWordsComponent } from '../../../app-shared/shared-sections/latest-words/latest-words.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminContainerComponent,StatisticsSectionComponent,MatGridListModule,UserStatusChartComponent,MostSearchedComponent,LatestWordsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
