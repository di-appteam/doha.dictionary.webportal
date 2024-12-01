import { NgFor, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../../../app-shared/components/confirmation-dialog/confirmation-dialog.component';
import { SharedDialogComponent } from '../../../app-shared/components/shared-dialog/shared-dialog.component';

@Component({
  selector: 'app-events-contents',
  standalone: true,
  imports: [MatDialogModule, MatTableModule, MatButtonModule, NgFor, DatePipe],
  templateUrl: './events-contents.component.html',
  styleUrl: './events-contents.component.scss'
})
export class EventsContentsComponent {
  events = [
    { title: 'event 1', description: 'Description 1', date: new Date(), image: 'image1.jpg' },
    { title: 'event 2', description: 'Description 2', date: new Date(), image: 'image2.jpg' },
  ];

  displayedColumns = ['title', 'description', 'date', 'actions'];

  constructor(private dialog: MatDialog) {}

  openEditDialog(event?: any) {
    const dialogRef = this.dialog.open(SharedDialogComponent, {
      data: event || { title: '', description: '', date: '', image: '' },
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        if (event) {
          // Update the event
          Object.assign(event, result);
        } else {
          // Add new event
          this.events.push(result);
        }
      }
    });
  }

  confirmDelete(event: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `هل أنت متأكد من حذف "${event.title}"؟` },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.events = this.events.filter((b) => b !== event);
      }
    });
  }

}
