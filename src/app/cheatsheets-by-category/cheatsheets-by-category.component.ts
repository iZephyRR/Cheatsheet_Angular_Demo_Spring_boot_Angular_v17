import { Component } from '@angular/core';
import { Cheatsheet } from '../model/cheatsheet';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CheatsheetService } from '../services/cheatsheet/cheatsheet.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-cheatsheets-by-category',
  templateUrl: './cheatsheets-by-category.component.html',
  styleUrl: './cheatsheets-by-category.component.css'
})
export class CheatsheetsByCategoryComponent {
  cateId! : number;
  categoryname! : string;
  cheatsheets : Cheatsheet[] = [];
  sanitizedImages: { [key: number]: SafeUrl } = {};

  constructor(private cheatsheetService: CheatsheetService ,
    private sanitizer: DomSanitizer,
    private route : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.cateId = this.route.snapshot.params['id'];
    this.categoryname = this.route.snapshot.params['name'];
    this.cheatsheetService.getByCategory(this.cateId).subscribe(data => {
      this.cheatsheets = data;
      this.cheatsheets.forEach(cheatsheet => {
        const image = `data:image/jpeg;base64,${cheatsheet.image}`;
        const safeImage = this.sanitizer.bypassSecurityTrustUrl(image);
        this.sanitizedImages[cheatsheet.id] = safeImage;
      });
    });
  }
}
