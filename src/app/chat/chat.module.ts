import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ChatLogComponent } from './chat-log/chat-log.component';
import { NewChatComponent } from './new-chat/new-chat.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';

@NgModule({
  declarations: [ChatLogComponent, NewChatComponent, ChatBoxComponent],
  imports: [CommonModule, HttpClientModule, ButtonsModule],
  exports: [NewChatComponent, ChatBoxComponent],
})
export class ChatModule {}
