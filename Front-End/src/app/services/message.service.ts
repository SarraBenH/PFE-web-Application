import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Alert } from '../models/alert.model';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = environment.url+'api'; // URL du backend Spring Boot

  
  constructor(private http: HttpClient) { }

  getMessagesByUserId(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl + '/messages/'+userId);
  }

  createMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.baseUrl + '/message', message);
  }

  deleteMessageById(messageId: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/message/' + messageId);
  }
  deleteMessagesByIds(ids: number[]) {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: ids 
      
    };
    return this.http.delete(this.baseUrl + '/messages', options);
  }
}
