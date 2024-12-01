import { NgFor, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../../../app-shared/components/confirmation-dialog/confirmation-dialog.component';
import { SharedDialogComponent } from '../../../app-shared/components/shared-dialog/shared-dialog.component';

@Component({
  selector: 'app-news-contents',
  standalone: true,
  imports: [MatDialogModule, MatTableModule, MatButtonModule, NgFor, DatePipe],
  templateUrl: './news-contents.component.html',
  styleUrl: './news-contents.component.scss'
})
export class NewsContentsComponent {
  news = [
    { title: 'news 1', description: 'Description 1', date: new Date(), image: 'image1.jpg' },
    { title: 'news 2', description: 'Description 2', date: new Date(), image: 'image2.jpg' },
  ];

  displayedColumns = ['title', 'description', 'date', 'actions'];

  constructor(private dialog: MatDialog) {}

  openEditDialog(news?: any) {
    const dialogRef = this.dialog.open(SharedDialogComponent, {
      data: news || { title: '', description: '', date: '', image: '' },
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        if (news) {
          // Update the news
          Object.assign(news, result);
        } else {
          // Add new news
          this.news.push(result);
        }
      }
    });
  }

  confirmDelete(news: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `هل أنت متأكد من حذف "${news.title}"؟` },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.news = this.news.filter((b) => b !== news);
      }
    });
  }
}
