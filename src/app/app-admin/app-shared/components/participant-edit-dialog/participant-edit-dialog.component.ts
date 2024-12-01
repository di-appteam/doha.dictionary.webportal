import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-participant-edit-dialog',
  standalone: true,
  templateUrl: './participant-edit-dialog.component.html',
  styleUrls: ['./participant-edit-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ParticipantEditDialogComponent {
  form: FormGroup;

  uploadedPhotoName: string | null = null;
  uploadedCVName: string | null = null;
  groups: any[] = []; // To store the list of groups

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ParticipantEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { participant: any; groups: any[] }
  ) {
    this.groups = data.groups; // Load groups from dialog data
    this.form = this.fb.group({
      titlevalue: [data.participant.titlevalue, Validators.required],
      subtitlevalue: [data.participant.subtitlevalue],
      paragraph: [data.participant.paragraph],
      imgsrc: [data.participant.imgsrc],
      downloadcvurl: [data.participant.downloadcvurl],
      groupid: [this.data.participant.groupid, Validators.required],
    });
  }

  onPhotoUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.saveFileToLocalFolder(file, 'assets/images/should-remove/participants').then(
          (savedFilePath) => {
            this.uploadedPhotoName = file.name;
            this.form.patchValue({ imgsrc: savedFilePath });
          }
        );
      };
      reader.readAsDataURL(file);
    }
  }

  onCVUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.saveFileToLocalFolder(file, 'assets/images/should-remove/participants/cv').then(
          (savedFilePath) => {
            this.uploadedCVName = file.name;
            this.form.patchValue({ downloadcvurl: savedFilePath });
          }
        );
      };
      reader.readAsDataURL(file);
    }
  }

  async saveFileToLocalFolder(file: File, folderPath: string): Promise<string> {
    // Simulate saving the file locally
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${folderPath}/${file.name}`);
      }, 1000); // Simulate a delay
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close({ ...this.data, ...this.form.value });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
