import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CheatsheetService } from '../services/cheatsheet/cheatsheet.service';
import { Cheatsheet } from '../model/cheatsheet';
import { response } from 'express';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user : User = new User();
  cheatsheets : Cheatsheet[] = [];
  sanitizedImages: { [key: number]: SafeUrl } = {};
  sanitizedSheet: { [key: number]: SafeUrl } = {};
  isLoggedInAdmin = false;

  constructor(private userService : UserService,
    private sheetService : CheatsheetService,
    private messageService : MessageService,
    private authService : AuthService,
    private sanitizer: DomSanitizer,
    private router : Router
  ){}
  
  ngOnInit() : void {
    this.isLoggedInAdmin = this.authService.isLoggedInAdmin();
    this.userService.getOne().subscribe(data  => {
      this.user = data;
      const image = `data:image/jpeg;base64,${this.user.image}`;
      this.sanitizedImages[this.user.id] = this.sanitizer.bypassSecurityTrustUrl(image); 
    });

    this.sheetService.getByUserId().subscribe(data =>{
      this.cheatsheets = data;
      this.cheatsheets.forEach(cheatsheet => {
        const image = `data:image/jpeg;base64,${cheatsheet.image}`;
        this.sanitizedSheet[cheatsheet.id] = this.sanitizer.bypassSecurityTrustUrl(image);
      });
    });
  }

  updateSheet(sheetId : number){
    this.router.navigate(['update/cheatsheet',sheetId]);
  }

  deleteSheet(sheetId : number){
    this.messageService.showConfirm("Are You Sure to Delete").subscribe(confirmed => {
      if (confirmed) {
        this.sheetService.delete(sheetId).subscribe(
          response => {
            this.messageService.showSuccess(response.message);
          }
        );
        window.location.reload();
      }
    });
    
    
  }




  // users : User[] = [];
  // sanitizedImages: { [key: number]: SafeUrl } = {};
  // constructor(private userService : UserService , private sanitizer: DomSanitizer){}
  // ngOnInit() : void {
  //   this.userService.getAll().subscribe (data => {
  //     this.users = data;
  //     this.users.forEach(user => { 
  //       const image = `data:image/jpeg;base64,${user.image}`;
  //       const safeImage = this.sanitizer.bypassSecurityTrustUrl(image);
  //       this.sanitizedImages[user.id] = safeImage;
  //     });
  //   });
  // }
}
