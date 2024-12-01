import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-shared-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    QuillModule,
  ],
  templateUrl: './shared-dialog.component.html',
  styleUrl: './shared-dialog.component.scss'
})
export class SharedDialogComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      title: [data?.title || ''],
      description: [data?.description || ''],
      date: [data?.date || ''],
      image: [data?.image || ''],
    });
  }
}
