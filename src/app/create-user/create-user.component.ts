import { Component } from '@angular/core';
import { ChatService } from 'src/services/chat.service';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

    user: string;
    room: string;
    title: String = 'Realtime Messenger';
    userName: String = 'User Name';
    visible: Boolean = true;
    messageText: String;
    constructor(private _chatService: ChatService, private _dataService: DataService) {
        window.history.forward();
        this._chatService.getCertificate();
    }

    join() {
        this.visible = false;
        this.title = this.room;
        this.userName = this.user;
        // console.log({user: this.user, room: this.room});
        this._chatService.joinRoom({user: this.user, room: this.room});
        this._dataService.setUserName(this.user);
        this._dataService.setRoom(this.room);
    }

    sendMessage() {
        this._chatService.sendMessage({user: this.user, room: this.room, message: this.messageText});
        this.messageText = '';
    }

}
