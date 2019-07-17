import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userName = new Rx.BehaviorSubject('default message');
  userNameObservable = this.userName.asObservable();
  private roomName = new Rx.BehaviorSubject('default message');
  roomNameObservable = this.roomName.asObservable();

  constructor() { }
  setUserName(user: string) {
    console.log('*' + user);
    this.userName.next(user);
  }

  setRoom(room: string) {
      console.log('*' + room);
      this.roomName.next(room);
  }

}
