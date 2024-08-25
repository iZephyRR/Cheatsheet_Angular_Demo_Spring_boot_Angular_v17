import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient!: Client; // Use non-null assertion operator
  private notificationsSubject = new BehaviorSubject<any>(null);

  notifications$ = this.notificationsSubject.asObservable();

  constructor() { 
    this.connect();
  }

  private connect() {
    console.log("yauk pr tl ");
    const socket = new SockJS('/ws');
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        this.stompClient.subscribe('/topic/notifications', (message) => {
          const notification = JSON.parse(message.body);
          this.notificationsSubject.next(notification);
        });
      },
      onWebSocketError: (error) => {
        console.error('WebSocket Error: ', error);
      },
      onDisconnect: (frame) => {
        console.log('Disconnected: ', frame);
      }
    });

    this.stompClient.activate();
  }
}
