import { Component } from '@angular/core';
import { Cheatsheet } from '../model/cheatsheet';
import { CheatsheetService } from '../services/cheatsheet/cheatsheet.service';
import { CategoryService } from '../services/category/category.service';
import { Category } from '../model/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categories : Category[] = [];
  constructor(private cateService : CategoryService){}
  
  ngOnInit() : void{
    this.cateService.getAll().subscribe(data => {
      this.categories = data;
    });
  }


}
