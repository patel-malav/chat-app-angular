import { Component, OnInit, OnDestroy } from '@angular/core';

import { MessagesService } from '../messages.service';
import { UserMessages } from '../interfaces';
import { ReplaySubject, Subscription, BehaviorSubject, Subject } from 'rxjs';
import { tap, switchMap, concatMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.less'],
})
export class ChatBoxComponent implements OnInit, OnDestroy {
  chatUser = new ReplaySubject<UserMessages>(1);
  queuedMessages = new Subject<string[]>();
  subs: Subscription[] = [];
  constructor(private messages: MessagesService) {}

  ngOnInit(): void {
    this.messages
      .getMessages('5f06cbe1b8e0f3ef73f23e85')
      .pipe(tap(console.log))
      .subscribe((data) => this.chatUser.next(data));

    this.queuedMessages.subscribe(console.log);

    this.queuedMessages
      .pipe(
        concatMap((value) => {
          console.log(value);
          return this.chatUser.pipe(
            take(1),
            switchMap((user) => this.messages.sendMessage(user.id, value))
          );
        })
      )
      .subscribe(console.log);
    // const subscription = this.queuedMessages
    //   .pipe(
    //     concatMap((value) =>
    //       this.chatUser.pipe(
    //         switchMap((user) => this.messages.sendMessage(user.id, value))
    //       )
    //     )
    //   )
    //   .subscribe((replys) => {
    //     console.log(replys);
    //     this.messages
    //       .getMessages('5f06cbe1b8e0f3ef73f23e85')
    //       .subscribe((data) => this.chatUser.next(data));
    //   });
    // this.subs.push(subscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  sendMessage(msg: string): void {
    console.log(msg);
    this.queuedMessages.pipe(take(1)).subscribe((data) => {
      this.queuedMessages.next([...data, msg]);
    });
  }
}
