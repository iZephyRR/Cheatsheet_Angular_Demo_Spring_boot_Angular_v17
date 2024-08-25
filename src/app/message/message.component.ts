import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../services/message/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})

export class MessageComponent implements OnInit, OnDestroy {
  message: any = null;
  private subscription!: Subscription;
  private autoDismissTimeout: number = 3000;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.subscription = this.messageService.message$.subscribe(message => {
      this.message = message;
      if (message && message.type === 'success') {
        this.autoDismiss();
      }
    });

    this.subscription.add(
      this.messageService.confirm$.subscribe(confirmed => {
        if (this.message && this.message.type === 'confirm') {
          this.handleConfirmation(confirmed);
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  close() {
    this.message = null;
  }

  confirm() {
    this.messageService.confirm(true);
  }

  cancel() {
    this.messageService.confirm(false);
    this.close();
  }

  private autoDismiss() {
    if (this.autoDismissTimeout > 0) {
      setTimeout(() => {
        this.close();
      }, this.autoDismissTimeout);
    }
  }

  private handleConfirmation(confirmed: boolean) {
    this.close();
  }

}
