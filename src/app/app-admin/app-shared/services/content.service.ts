import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ContentItem {
  id: number;
  title: string;
  description: string;
  date: Date;
  image: string;
}


@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private apiUrl = 'https://your-backend-api-url/api/content'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch content by category
  getContentByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?category=${category}`);
  }

  // Update a specific content item
  updateContent(content: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${content.id}`, content);
  }

  // Add new content
  addContent(content: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, content);
  }

  // Delete a content item
  deleteContent(contentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${contentId}`);
  }

  //////////////////////// News Events Section ///////////////////////////////////////////
  private newsItems = new BehaviorSubject<ContentItem[]>([]);
  private eventsItems = new BehaviorSubject<ContentItem[]>([]);

  getNews() {
    return this.newsItems.asObservable();
  }

  getEvents() {
    return this.eventsItems.asObservable();
  }

  addNews(item: ContentItem) {
    const current = this.newsItems.value;
    this.newsItems.next([...current, item]);
  }

  addEvent(item: ContentItem) {
    const current = this.eventsItems.value;
    this.eventsItems.next([...current, item]);
  }

  updateNews(item: ContentItem) {
    const current = this.newsItems.value.map((i:any )=> (i.id === item.id ? item : i));
    this.newsItems.next(current);
  }

  updateEvent(item: ContentItem) {
    const current = this.eventsItems.value.map((i:any )=> (i.id === item.id ? item : i));
    this.eventsItems.next(current);
  }

  deleteNews(id: number) {
    const current = this.newsItems.value.filter((i:any )=> i.id !== id);
    this.newsItems.next(current);
  }

  deleteEvent(id: number) {
    const current = this.eventsItems.value.filter((i:any )=> i.id !== id);
    this.eventsItems.next(current);
  }
  /////////////////////////////////////////////////////////////////////////////
}
