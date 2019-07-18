import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http/';
import { Subject } from 'rxjs';
import * as Rx from 'rxjs';
@Injectable()


export class ChatService {

    private socket = io('https://myservercode.herokuapp.com');
    // private url = 'http://localhost:8080';
    constructor(private http: HttpClient) { }
    // getCertificate() {
    //     // console.log('hello');
    //     this.http.get(this.url);
    // }

    joinRoom(data) {
        // console.log(this.socket);
        this.socket.emit('join', data);
    }

    newUserJoined() {
        const observable = new Observable<{user: String, message: String}>(observer => {
            this.socket.on('New User connected', (data) => {
                // console.log(data);
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });

        return observable;
    }

    leaveRoom(data) {
        this.socket.emit('leave', data);
    }

    userLeftRoom() {
        const observable = new Observable<{user: String, message: String}>(observer => {
            this.socket.on('left room', (data) => {
                observer.next(data);
            });
            return () => {this.socket.disconnect(); };
        });

        return observable;
    }

    sendMessage(data) {
        this.socket.emit('message', data);
    }

    newMessageReceived() {
        const observable = new Observable<{user: String, message: String}>(observer => {
            this.socket.on('new message', (data) => {
                observer.next(data);
            });
            return () => {this.socket.disconnect(); };
        });

        return observable;
    }
}
