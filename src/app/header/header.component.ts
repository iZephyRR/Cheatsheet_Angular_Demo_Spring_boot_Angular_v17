import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;
  isLoggedInAdmin = false;
  dropdownOpen = false;

  constructor(private authService: AuthService, 
    private router: Router,
    private messageService : MessageService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isLoggedInAdmin = this.authService.isLoggedInAdmin();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.messageService.showConfirm('Are you sure you want to logout?').subscribe(confirmed => {
      if (confirmed) {
        // Proceed with logout logic
        this.authService.logout();
        this.isLoggedIn = false;
        this.isLoggedInAdmin = false;
        this.router.navigate(['/home']);
      }
    });
  }

  
}
