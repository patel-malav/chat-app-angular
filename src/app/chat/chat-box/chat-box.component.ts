import { Component, OnInit } from '@angular/core';

import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.less'],
})
export class ChatBoxComponent implements OnInit {
  constructor(private messages: MessagesService) {}

  ngOnInit(): void {}
}
