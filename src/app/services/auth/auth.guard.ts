import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MessageService } from '../message/message.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  const token = authService.getToken();

  if (token) {
    return true;
  } else {
    messageService.showConfirm("Please Login First!!").subscribe(confirmed =>{
      if (confirmed){
        router.navigate(['/login']);
      }
    });
    return false;
  }
};
