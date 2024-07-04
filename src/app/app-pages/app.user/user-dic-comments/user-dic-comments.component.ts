import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDicCommentsFormComponent } from './user.dic.comments.sections/user-comments-form/user-dic-comments-form.component';

@Component({
  selector: 'app-user-dic-comments',
  standalone: true,
  imports: [FormsModule, UserDicCommentsFormComponent],
  templateUrl: './user-dic-comments.component.html',
  styleUrls: ['./user-dic-comments.component.scss']
})
export class UserDicCommentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
