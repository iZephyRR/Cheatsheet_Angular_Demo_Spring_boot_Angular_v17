import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Login } from '../model/login';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { MessageService } from '../services/message/message.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login : Login = new Login();
  constructor(private userService : UserService,
      private authService : AuthService,
      private messageService : MessageService,
      private router : Router,
      @Inject(PLATFORM_ID) private platformId: Object
    ){ }

  userLogin(form : NgForm) {
    this.authService.login(this.login).subscribe( 
      response =>{
        if(isPlatformBrowser(this.platformId)) {
          console.log(response.token);
          console.log(response.message);
          localStorage.setItem("authToken",response.token);
          const status = this.authService.getStatus(response.token);
          console.log("status : "+ status);
          const role = this.authService.getRole(response.token);
          console.log("role : "+ role);
          if(status == 1) {
            this.router.navigate(['/home']).then(() => {
              this.messageService.showError("Your Account is banned!!");
            });
          } else {
            if (role === 'ADMIN') {
              this.messageService.showSuccess(response.message + " As Admin");
            }else {
              this.messageService.showSuccess(response.message);
            }
          }
          form.reset();
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });          
        }
      },
      error => {
        this.messageService.showError("An error occurred during authentication");
      }
    );
  }
}
