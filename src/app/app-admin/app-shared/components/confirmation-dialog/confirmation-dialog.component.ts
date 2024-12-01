import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule], // Required Angular Material modules
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
