import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { IRoot } from '../../../../../app-models/dictionary.model';
import { DictionaryService } from '../../../../../app-shared/services/dictionary.service';
import { SharedRootComponentValues } from '../../../../../app-shared/services/root.general.service';
import { AlertComponent } from '../../../../../app-shared/shared-sections/alert/alert.component';
import { AdminContainerComponent } from '../../../../app-shared/components/admin-container/admin-container.component';

@Component({
  selector: 'app-root-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertComponent,
    AdminContainerComponent,
    RouterModule,
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
    MatTableModule,
  ],
  templateUrl: './root-management.component.html',
  styleUrls: ['./root-management.component.scss'],
  providers: [DictionaryService],
})
export class RootManagementComponent implements OnInit {
  searchValue: string = ''; // For search input
  dataSource: MatTableDataSource<IRoot> = new MatTableDataSource<IRoot>([]);
  displayedColumns: string[] = [
    'rootValue',
    'rootValueUV',
    'issplitted',
    'HasDocument',
    'actions',
  ]; // Columns to display

  @ViewChild(MatPaginator) paginator!: MatPaginator; // For pagination

  constructor(
    public _sharedRootComponentValues: SharedRootComponentValues,
    private _dictionaryService: DictionaryService
  ) {}

  ngOnInit(): void {
    this.getRoots();

    // Configure filtering
    this.dataSource.filterPredicate = (data: IRoot, filter: string) => {
      return (
        data.rootValue.trim().toLowerCase().includes(filter) ||
        data.rootValueUV.trim().toLowerCase().includes(filter)
      );
    };
  }

  /**
   * Fetch roots from the dictionary service and set them in the table.
   */
  private getRoots(): void {
    this._dictionaryService.SearchInRoot('', 0).subscribe((searchResult: any) => {
      this.setRootList(searchResult.Data);
    });
  }

  /**
   * Sets the root list and configures the paginator.
   * @param rootList - The list of roots
   */
  private setRootList(rootList: IRoot[]): void {
    this.dataSource = new MatTableDataSource<IRoot>(rootList);
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Filters the root list based on the search input.
   */
  filterRoots(): void {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Toggle activation status for a root.
   * @param root - The root to activate or deactivate
   */
  toggleActivation(root: IRoot): void {
    root.inprogress = root.inprogress === 1 ? 0 : 1;
    alert(
      `تم ${root.inprogress === 0 ? 'تنشيط' : 'إلغاء تنشيط'} الجذر: ${
        root.rootValue
      }`
    );
  }
}
