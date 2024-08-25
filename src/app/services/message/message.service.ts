import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject<any>();
  private confirmSource = new Subject<boolean>();
  message$ = this.messageSource.asObservable();
  confirm$ = this.confirmSource.asObservable();

  showSuccess(message: string, autoDismissTime: number = 3000) {
    this.messageSource.next({ type: 'success', text: message });
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout);
    }

    this.dismissTimeout = setTimeout(() => {
      this.close();
    }, autoDismissTime);
  }

  showError(message: string, autoDismissTime: number = 3000) {
    this.messageSource.next({ type: 'error', text: message });
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout);
    }

    this.dismissTimeout = setTimeout(() => {
      this.close();
    }, autoDismissTime);
  }

  showConfirm(message: string): Observable<boolean> {
    this.messageSource.next({ type: 'confirm', text: message });
    return this.confirm$;
  }

  confirm(confirmed: boolean) {
    this.confirmSource.next(confirmed);
  }

  private close() {
    this.messageSource.next(null);
  }

  private dismissTimeout: any;

  
}
