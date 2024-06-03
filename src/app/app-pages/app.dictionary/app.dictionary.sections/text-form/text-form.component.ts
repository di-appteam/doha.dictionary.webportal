import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'text-form',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss']
})
export class TextFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
