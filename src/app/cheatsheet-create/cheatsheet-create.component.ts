import { Component } from '@angular/core';
import { Cheatsheet } from '../model/cheatsheet';
import { CheatsheetService } from '../services/cheatsheet/cheatsheet.service';
import { NgForm } from '@angular/forms';
import { Category } from '../model/category';
import { CategoryService } from '../services/category/category.service';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-cheatsheet-create',
  templateUrl: './cheatsheet-create.component.html',
  styleUrl: './cheatsheet-create.component.css'
})
export class CheatsheetCreateComponent {
  cheatsheet : Cheatsheet = new Cheatsheet();
  imagePreview: string | ArrayBuffer | null = null;
  pdfPreview: string | ArrayBuffer | null = null;
  categories : Category[] = [];

  constructor(private cheatsheetService : CheatsheetService,
    private cateService : CategoryService,
    private messageService : MessageService
  ) { } 

  onFileChange(event: any, fileType: string): void {
    const file = event.target.files[0];
    if (file) {
      if (fileType === 'image') {
        this.cheatsheet.image = file;
        const reader = new FileReader();
        reader.onload = () => this.imagePreview = reader.result;
        reader.readAsDataURL(file);
      } else if (fileType === 'pdf') {
        this.cheatsheet.pdfFile = file;
        this.pdfPreview = file.name;
        this.cheatsheet.filename = file.name;
      }
    }
  }
  
  clearPreview(): void {
    this.imagePreview = null;
    this.pdfPreview = null;
    this.cheatsheet = new Cheatsheet();
  }
  

  ngOnInit() : void{
    this.cateService.getAll().subscribe(data => {
      
      this.categories = data;
    });
  }

  create(form: NgForm): void {
    const formData = new FormData();
  
    formData.append('title', this.cheatsheet.title || '');
    formData.append('summary', this.cheatsheet.summary || '');
    formData.append('categoryId', this.cheatsheet.categoryId ? this.cheatsheet.categoryId.toString() : '');
    
    if (this.cheatsheet.pdfFile) {
      formData.append('pdfFile', this.cheatsheet.pdfFile);
      formData.append('filename',this.cheatsheet.filename || '');
    }
    
    if (this.cheatsheet.image) {
      formData.append('imageFile', this.cheatsheet.image,this.cheatsheet.image.name);
    }
  
    this.cheatsheetService.add(formData).subscribe(
      response => {
        this.messageService.showSuccess(response.message);
        form.reset();
        this.clearPreview();
      },
      error => {
        this.messageService.showError("")
      }
    );
  }
  
 
  
  

}
