import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '../../../../../app-shared/shared-sections/alert/alert.component';
import { DictionaryService } from '../../../../../app-shared/services/dictionary.service';
import { IRoot, ISummaryLexicalSheet } from '../../../../../app-models/dictionary.model';
import { UpdateLexicalSheetDialogComponent } from './update-lexical-sheet-dialog/update-lexical-sheet-dialog.component';
import { AdminContainerComponent } from '../../../../app-shared/components/admin-container/admin-container.component';

@Component({
  selector: 'app-lexical-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    AlertComponent,
    AdminContainerComponent,
  ],
  templateUrl: './lexical-management.component.html',
  styleUrls: ['./lexical-management.component.scss'],
  providers: [DictionaryService],
})
export class LexicalManagementComponent implements OnInit {
  roots: IRoot[] = [];
  selectedRootId: number | null = null; // Selected root ID
  lexicalSheets: MatTableDataSource<ISummaryLexicalSheet> =
    new MatTableDataSource<ISummaryLexicalSheet>();
  displayedColumns: string[] = [
    'lemmaValue',
    'lemmaValueUV',
    'meaning',
    'citation',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dictionaryService: DictionaryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchRoots();
  }

  /**
   * Fetch roots from the server and populate the dropdown.
   */
  fetchRoots(): void {

    this.dictionaryService.SearchInRoot('', 0).subscribe((result: any) => {
      this.roots = result.Data || [];
    });
  }

  /**
   * Fetch lexical sheets for the selected root.
   */
  fetchLexicalSheets(): void {
    if (this.selectedRootId !== null) {
      this.dictionaryService
        .getRootDetail(this.selectedRootId)
        .subscribe((result: any) => {
          this.lexicalSheets = new MatTableDataSource<ISummaryLexicalSheet>(
            result || []
          );
          this.lexicalSheets.paginator = this.paginator;
        });
    }
  }

  /**
   * Open the update dialog for a lexical sheet.
   * @param sheet - The lexical sheet to update
   */
  openUpdateDialog(sheet: ISummaryLexicalSheet): void {
    const dialogRef = this.dialog.open(UpdateLexicalSheetDialogComponent, {
      width: '600px',
      data: sheet,
    });

    dialogRef.afterClosed().subscribe((updated: boolean) => {
      if (updated) {
        this.fetchLexicalSheets();
      }
    });
  }

  /**
   * Handle deactivation of a lexical sheet with confirmation.
   * @param sheet - The lexical sheet to deactivate
   */
  deactivateSheet(sheet: ISummaryLexicalSheet): void {
    const confirmed = confirm(
      `هل أنت متأكد أنك تريد إلغاء تفعيل "${sheet.lemmaValue}"؟`
    );

    if (confirmed) {
      /*this.dictionaryService
        .deactivateLexicalSheet(sheet.ID)
        .subscribe(() => {
          alert('تم إلغاء التفعيل بنجاح');
          this.fetchLexicalSheets();
        });*/
    }
  }

    // Utility to parse special markers like $cfO and $cfC in the data
    parseCitation(text: string): string {
      return text.replace(/\$cfO/g, '<span class="highlight">')
                 .replace(/\$cfC/g, '</span>');
    }
}
