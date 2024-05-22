import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../directive/permissions.directive';
import { LoginSectionComponent } from '../../shared-sections/login-section/login-section.component';
import { RootSectionComponent } from '../../shared-sections/root-section/root-section.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,TranslateModule
    ,RouterModule,LoginSectionComponent,RootSectionComponent,HasPermissionDirective],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
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
