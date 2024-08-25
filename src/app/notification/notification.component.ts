import { Component } from '@angular/core';
import { WebSocketService } from '../services/websocket/web-socket.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  notifications : any[] = [];

  constructor (private websocketService : WebSocketService) { }

  ngOnInit(): void {
    this.websocketService.notifications$.subscribe(notify => {
      if (notify) {
        console.log(notify);
        this.notifications.push(notify);
      }
    });
  }
}
