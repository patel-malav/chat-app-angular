import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User, UserMessages } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User> {
    return this.http.get<User>(`${environment.url}/users`);
  }

  getMessages(id: string): Observable<UserMessages> {
    return this.http.get<UserMessages>(
      `${environment.url}/users/${id}/messages`
    );
  }

  sendMessage(id: string, messages: string[]): Observable<any> {
    return this.http.post(`${environment.url}/users/${id}/messages`, {
      messages,
    });
  }
}
