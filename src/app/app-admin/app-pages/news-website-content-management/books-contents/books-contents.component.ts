import { NgFor, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../../../app-shared/components/confirmation-dialog/confirmation-dialog.component';
import { SharedDialogComponent } from '../../../app-shared/components/shared-dialog/shared-dialog.component';

@Component({
  selector: 'app-books-contents',
  standalone: true,
  imports: [MatDialogModule, MatTableModule, MatButtonModule, NgFor, DatePipe],
  templateUrl: './books-contents.component.html',
  styleUrl: './books-contents.component.scss'
})
export class BooksContentsComponent {
  books = [
    { title: 'Book 1', description: 'Description 1', date: new Date(), image: 'image1.jpg' },
    { title: 'Book 2', description: 'Description 2', date: new Date(), image: 'image2.jpg' },
  ];

  displayedColumns = ['title', 'description', 'date', 'actions'];

  constructor(private dialog: MatDialog) {}

  openEditDialog(book?: any) {
    const dialogRef = this.dialog.open(SharedDialogComponent, {
      data: book || { title: '', description: '', date: '', image: '' },
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        if (book) {
          // Update the book
          Object.assign(book, result);
        } else {
          // Add new book
          this.books.push(result);
        }
      }
    });
  }

  confirmDelete(book: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `هل أنت متأكد من حذف "${book.title}"؟` },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.books = this.books.filter((b) => b !== book);
      }
    });
  }
}
