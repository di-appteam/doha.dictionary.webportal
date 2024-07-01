import { NgIf, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'bibliography-text-form',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass,TranslateModule,
    NgSelectModule],
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss']
})
export class TextFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
