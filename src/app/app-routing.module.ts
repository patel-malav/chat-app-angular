import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatLogComponent } from './chat/chat-log/chat-log.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/chatlog',
  },
  {
    path: 'chatlog',
    component: ChatLogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
