import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Category } from '../model/category';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../services/category/category.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {
  category : Category = new Category();
  categories : Category[] = [];

  constructor(private cateService : CategoryService, 
    private messageService : MessageService,
    @Inject(PLATFORM_ID) private platformId : Object
  ){}
  
  ngOnInit() : void{
    this.cateService.getAll().subscribe(data => {
      this.categories = data;
    });
  }
  
  create(form : NgForm) {
    this.cateService.add(this.category).subscribe({
      next : (response) => {
        this.messageService.showSuccess(response.message);
        form.reset();
      },
      error :(error) => {
        this.messageService.showError("Category already exist!!");
      }
    });
  }


  


  
}
