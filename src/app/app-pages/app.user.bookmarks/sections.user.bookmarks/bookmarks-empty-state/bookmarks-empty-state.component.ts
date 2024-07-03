import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'bookmarks-empty-state',
  standalone: true,
  imports: [ FormsModule, RouterLink,TranslateModule],
  templateUrl: './bookmarks-empty-state.component.html',
  styleUrls: ['./bookmarks-empty-state.component.scss']
})
export class BookmarksEmptyStateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
