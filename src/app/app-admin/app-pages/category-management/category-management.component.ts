import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from '../../../app-shared/shared-sections/alert/alert.component';
import { AdminContainerComponent } from '../../app-shared/components/admin-container/admin-container.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Category, CategoryService } from '../../../app-shared/services/category.service';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [
    CommonModule, TranslateModule, ReactiveFormsModule, FormsModule, AlertComponent,AdminContainerComponent
    , RouterModule,
    MatCheckboxModule ,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.scss',
  providers:[CategoryService]
})
export class CategoryManagementComponent {
  @Output() categorySelected = new EventEmitter<string>();
  categories :any;
  categoryForm: FormGroup;
  displayedColumns: string[] = ['name', 'order', 'displayInMenu', 'actions'];


  constructor(private fb: FormBuilder,private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      order: [null, Validators.required],
      displayInMenu: [false],
      isEditable: [true],
      routerLink: [''],
      externalLink: [''],
      style: [''],
    });
    this.categories = new MatTableDataSource( this.categoryService.flattenCategories());
  }

  selectCategory(category: string): void {
    this.categorySelected.emit(category);
  }

  addCategory(): void {
    if (this.categoryForm.valid) {
      const newCategory: Category = {
        label: this.categoryForm.value.name,
        order: this.categoryForm.value.order,
        displayInMenu: this.categoryForm.value.displayInMenu,
        isEditable: this.categoryForm.value.isEditable,
        routerLink: this.categoryForm.value.routerLink || undefined,
        externalLink: this.categoryForm.value.externalLink || undefined,
        style: this.categoryForm.value.style
          ? JSON.parse(this.categoryForm.value.style)
          : undefined,
      };

      this.categoryService.addCategories(newCategory);
      console.log('Category added:', newCategory);
      this.categories = new MatTableDataSource( this.categoryService.flattenCategories());
      // Reset the form
      this.categoryForm.reset({
        name: '',
        order: null,
        displayInMenu: false,
        isEditable: true,
        routerLink: '',
        externalLink: '',
        style: '',
      });
    }
  }

  editCategory(category: any): void {
    // Logic to edit a category (e.g., populate form with category data)
    this.categoryForm.patchValue(category);
  }

  deleteCategory(category: any): void {
    this.categoryService.deleteCategories(category);
    this.categories = new MatTableDataSource( this.categoryService.flattenCategories());
  }

}
