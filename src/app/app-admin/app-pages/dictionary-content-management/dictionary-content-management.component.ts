import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminContainerComponent } from '../../app-shared/components/admin-container/admin-container.component';
import { LexicalManagementComponent } from './dictionary-contents/lexical-management/lexical-management.component';
import { RootManagementComponent } from './dictionary-contents/root-management/root-management.component';

@Component({
  selector: 'app-dictionary-content-management',
  standalone: true,
  imports: [
    AdminContainerComponent,MatTableModule, MatTabsModule,
    RootManagementComponent,
    LexicalManagementComponent,
  ],
  templateUrl: './dictionary-content-management.component.html',
  styleUrls: ['./dictionary-content-management.component.scss'],
})
export class DictionaryContentManagementComponent {

}
