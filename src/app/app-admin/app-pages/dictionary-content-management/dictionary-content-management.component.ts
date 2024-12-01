import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AdminContainerComponent } from '../../app-shared/components/admin-container/admin-container.component';
import { LexicalManagementComponent } from './dictionary-contents/lexical-management/lexical-management.component';
import { RootManagementComponent } from './dictionary-contents/root-management/root-management.component';

@Component({
  selector: 'app-dictionary-content-management',
  standalone: true,
  imports: [
    CommonModule,
    AdminContainerComponent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    RootManagementComponent,
    LexicalManagementComponent,
  ],
  templateUrl: './dictionary-content-management.component.html',
  styleUrls: ['./dictionary-content-management.component.scss'],
})
export class DictionaryContentManagementComponent {
  categories = [
    { key: 'Root', label: 'الجذر' },
    { key: 'Lexical Sheet', label: 'صحيفة المعجم' },
  ];
  selectedCategory: string = this.categories[0].key;

  loadContent(): void {
    console.log(`Selected category: ${this.selectedCategory}`);
  }
}
