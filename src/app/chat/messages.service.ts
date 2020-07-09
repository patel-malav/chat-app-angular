import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User, Messages } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User> {
    return this.http.get<User>(`${environment.url}/users`);
  }

  getMessages(id: string): Observable<Messages> {
    return this.http.get<Messages>(`${environment.url}/users/${id}/messages`);
  }

  sendMessage(id: string, message: string): Observable<any> {
    return this.http.post(`${environment.url}/users/${id}/messages`, {
      message,
    });
  }
}
