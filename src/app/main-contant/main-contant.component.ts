import { Component } from '@angular/core';
import { Cheatsheet } from '../model/cheatsheet';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CheatsheetService } from '../services/cheatsheet/cheatsheet.service';

@Component({
  selector: 'app-main-contant',
  templateUrl: './main-contant.component.html',
  styleUrl: './main-contant.component.css'
})
export class MainContantComponent {
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
