import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,TranslateModule
    ,RouterModule],
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.scss'
})
export class AppFooterComponent  implements OnInit {
  public copyRightsStr : string = "";
  constructor(public translate: TranslateService) { }

  ngOnInit() {
   this.translate.get(["shared.footer.copyrights", "charts.corpusstatistics"]).subscribe(words => {
      this.copyRightsStr =  words["shared.footer.copyrights"];
      this.copyRightsStr =  this.copyRightsStr.replace('@year',(new Date()).getFullYear().toString());
    });
  }
}
