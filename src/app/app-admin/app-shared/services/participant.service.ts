import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private apiUrl = 'https://your-backend-api-url/api/participants'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch filtered participants
  getParticipants(filter: string = ''): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?search=${filter}`);
  }

  // Update participant order
  updateOrder(participants: any[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reorder`, participants);
  }

  // Update a specific participant's details
  updateParticipant(participant: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${participant.id}`, participant);
  }

  // Delete a participant
  deleteParticipant(participantId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${participantId}`);
  }
}
