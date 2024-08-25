import { Component } from '@angular/core';
import { User } from '../model/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message/message.service';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user : User = new User();
 
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private authService : AuthService,
    private router: Router,
    private messsgeService : MessageService
  ){}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.user.image = this.imagePreview as string;
      };
      reader.readAsDataURL(file);
    }
  }

  clearPreview() {
    this.imagePreview = null;   
  }

  getOTP () {
    this.authService.requestOTP(this.user.email);
  }

  register(form : NgForm){
    this.authService.register(this.user).subscribe(
      response => {
        this.messsgeService.showSuccess(response.message);
        form.reset();
        this.clearPreview();
        this.router.navigate(['/home']);
      },
      error => {
        alert(error.message);
      }
    );   
  }

  


}

