import { Component, OnInit } from '@angular/core';
import { CheatsheetService } from '../services/cheatsheet/cheatsheet.service';
import { Cheatsheet } from '../model/cheatsheet';
import { User } from '../model/user';
import { UserService } from '../services/user/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cheatsheet-list',
  templateUrl: './cheatsheet-list.component.html',
  styleUrl: './cheatsheet-list.component.css'
})
export class CheatsheetListComponent  {
  cheatsheets : Cheatsheet[] = [];
  sanitizedImages: { [key: number]: SafeUrl } = {};

  constructor(private cheatsheetService: CheatsheetService,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.cheatsheetService.getAll().subscribe(data => {
      this.cheatsheets = data;
      this.cheatsheets.forEach(cheatsheet => {
        const image = `data:image/jpeg;base64,${cheatsheet.image}`;
        const safeImage = this.sanitizer.bypassSecurityTrustUrl(image);
        this.sanitizedImages[cheatsheet.id] = safeImage;
      });
    });
  }
  
  

}
