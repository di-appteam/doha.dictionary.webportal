import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AlertEnum } from '../../../app-models/dictioanry.search.results.models';

@Component({
  selector: 'alert',
  standalone: true,
  imports: [CommonModule,TranslateModule,RouterLink ],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnChanges {


  constructor() { }

  @Input() type?: AlertEnum;
  @Input() message: string ="";
  public alertTypeClass: string = "";
  public iconClass: string= "";

  ngOnInit() {

    this.getAlertClass();

  }

  ngOnChanges(changes: SimpleChanges): void {
    /*if(!this._sharedConfiguration.validToken())
    {
      this.type = AlertEnum.ERROR;
    }*/
    this.getAlertClass();
  }

  getAlertClass() {

    switch (this.type) {
      case AlertEnum.SUCCCESS:
        this.alertTypeClass = 'success';
        this.iconClass = 'icon-checkmark-o';
        break;
      case AlertEnum.ERROR:
        this.alertTypeClass = 'error';
        this.iconClass = 'icon-close-o';
        break;
      default:
        this.alertTypeClass = '';
        break;
    }

  }

}
