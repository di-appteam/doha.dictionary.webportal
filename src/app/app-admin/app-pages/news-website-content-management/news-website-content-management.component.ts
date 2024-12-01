import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BooksContentsComponent } from './books-contents/books-contents.component';
import { EventsContentsComponent } from './events-contents/events-contents.component';
import { NewsContentsComponent } from './news-contents/news-contents.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AdminContainerComponent } from '../../app-shared/components/admin-container/admin-container.component';

@Component({
  selector: 'app-news-website-content-management',
  standalone: true,
  imports: [AdminContainerComponent,MatDialogModule, MatTableModule, MatTabsModule,NewsContentsComponent,EventsContentsComponent,BooksContentsComponent],
  templateUrl: './news-website-content-management.component.html',
  styleUrl: './news-website-content-management.component.scss'
})
export class NewsWebsiteContentManagementComponent {

}
