import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessagesService } from '../messages.service';
import { Messages } from '../interfaces';

@Component({
  selector: 'app-chat-log',
  templateUrl: './chat-log.component.html',
  styleUrls: ['./chat-log.component.less'],
})
export class ChatLogComponent implements OnInit {
  constructor(private messages: MessagesService) {}

  data: Observable<Messages>;

  ngOnInit(): void {
    this.data = this.messages
      .getMessages('5f06cbe1b8e0f3ef73f23e85')
      .pipe(tap(console.log));
  }
}
