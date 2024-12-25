import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../directive/permissions.directive';
import { LoginSectionComponent } from '../../shared-sections/login-section/login-section.component';
import { RootSectionComponent } from '../../shared-sections/root-section/root-section.component';

@Component({
  selector: 'app-app-header-old-v',
  standalone: true,
  imports: [NgClass,NgIf,TranslateModule
    ,RouterModule,LoginSectionComponent,RootSectionComponent,HasPermissionDirective],
  templateUrl: './app-header-old-v.component.html',
  styleUrl: './app-header-old-v.component.scss'
})
export class AppHeaderOldVComponent {
  public openNav: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleNav() {
    this.openNav = !this.openNav;
  }
  closeNav() {
    this.openNav = false;
  }

}
