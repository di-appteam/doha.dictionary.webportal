import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface UpdateLexicalSheetDialogData {
  lemmaValue: string;
  lemmaValueUV: string;
  meaning: string;
  citation: string;
}

@Component({
  selector: 'app-update-lexical-sheet-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './update-lexical-sheet-dialog.component.html',
  styleUrls: ['./update-lexical-sheet-dialog.component.scss'],
})
export class UpdateLexicalSheetDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateLexicalSheetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateLexicalSheetDialogData
  ) {
    this.form = this.fb.group({
      lemmaValue: [data.lemmaValue, Validators.required],
      lemmaValueUV: [data.lemmaValueUV, Validators.required],
      meaning: [data.meaning, Validators.required],
      citation: [data.citation, Validators.required],
    });
  }

  /**
   * Save the updated lexical sheet details and close the dialog.
   */
  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
