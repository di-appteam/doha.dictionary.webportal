import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { LatestWordsComponent } from '../latest-words/latest-words.component';
import { MostSearchedComponent } from '../most-searched/most-searched.component';
import { StatisticsSectionComponent } from '../statistics-section/statistics-section.component';

@Component({
  selector: 'app-dynamic-grid-section',
  standalone: true,
  imports: [MatGridListModule,MostSearchedComponent,LatestWordsComponent, StatisticsSectionComponent],
  templateUrl: './dynamic-grid-section.component.html',
  styleUrl: './dynamic-grid-section.component.scss'
})
export class DynamicGridSectionComponent implements OnInit{
  breakpoint: number = 0;
  ngOnInit(): void {

    this.breakpoint = (window.innerWidth <= 991) ? 1 : 2;
  }

  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 991) ? 1 : 2;
  }
}
