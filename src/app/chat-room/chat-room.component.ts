import { Component, AfterViewInit, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/services/chat.service';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  user: String;
  userNameSubscription: Subscription;
  room: String;
  roomNameSubscription: Subscription;
  messageText: String;
  messageArray: Array<{user: String, message: String}> = [];
  disabledFlag = true;
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;

  constructor(private _chatService: ChatService, private _dataService: DataService) {
    this._chatService.newUserJoined()
        .subscribe(data => this.messageArray.push(data));
    this._chatService.newMessageReceived()
        .subscribe(data => this.messageArray.push(data));
    this._chatService.userLeftRoom()
    .subscribe(data => this.messageArray.push(data));
    window.history.forward();
  }

    ngOnInit() {
      this.userNameSubscription = this._dataService.userNameObservable.subscribe((userName) => {
        this.user = userName;
        console.log(this.user);
      });
      this.roomNameSubscription = this._dataService.roomNameObservable.subscribe((roomName) => {
        this.room = roomName;
        console.log(this.room);
      });
    }

    ngOnDestroy() {
      this.userNameSubscription.unsubscribe();
      this.roomNameSubscription.unsubscribe();
    }
    sendMessage() {
      this._chatService.sendMessage({user: this.user, room: this.room, message: this.messageText});
      this.disabledFlag = false;
      console.log('hello' + ' ' + this.messageText + ' ' + this.user + ' ' + this.room);
      this.messageText = '';
      this.componentRef.directiveRef.scrollToBottom();
    }

    leave() {
      this._chatService.leaveRoom({user: this.user, room: this.room});
  }

}
