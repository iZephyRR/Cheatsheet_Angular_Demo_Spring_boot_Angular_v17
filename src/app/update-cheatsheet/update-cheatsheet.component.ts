import { Component } from '@angular/core';
import { Cheatsheet } from '../model/cheatsheet';
import { CheatsheetService } from '../services/cheatsheet/cheatsheet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Category } from '../model/category';
import { CategoryService } from '../services/category/category.service';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import { MessageService } from '../services/message/message.service';
import { error, timeStamp } from 'console';

@Component({
  selector: 'app-update-cheatsheet',
  templateUrl: './update-cheatsheet.component.html',
  styleUrl: './update-cheatsheet.component.css'
})
export class UpdateCheatsheetComponent {
  sheetId! : number;
  sheet : Cheatsheet = new Cheatsheet();
  categories : Category[] = [];
  sanitizedSheet: { [key: number]: SafeUrl } = {};
  imagePreview: string | ArrayBuffer | null = null;
  pdfPreview: string | ArrayBuffer | null = null;
  

  constructor(private cheatsheetService : CheatsheetService,
    private cateService : CategoryService,
    private messageService : MessageService,
    private router : Router,
    private route : ActivatedRoute,
    private sanitizer : DomSanitizer
  ){}

  ngOnInit(): void {
    this.sheetId = this.route.snapshot.params['id'];
    this.cheatsheetService.getByIdToUpdate(this.sheetId).subscribe(data =>{
      this.sheet = data;
      const image = `data:image/jpeg;base64,${this.sheet.image}`;
      this.sanitizedSheet[this.sheet.id] = this.sanitizer.bypassSecurityTrustUrl(image);
    });
    this.cateService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  update(form : NgForm) : void{
    const formData = new FormData();
    const sheetId = this.sheet.id;
    console.log(sheetId);
    formData.append('id', this.sheet.id.toString());
    formData.append('title', this.sheet.title || '');
    formData.append('summary', this.sheet.summary || '');
    formData.append('categoryId', this.sheet.categoryId ? this.sheet.categoryId.toString() : '');
    
    if (this.sheet.pdfFile) {
      formData.append('pdfFile', this.sheet.pdfFile);
      formData.append('filename',this.sheet.filename || '');
    }
    
    if (this.sheet.image) {
      formData.append('imagefile', this.sheet.image,this.sheet.image.name);
    }

    this.cheatsheetService.update(formData, sheetId).subscribe (
      response => {
        this.messageService.showSuccess(response.message);
        this.router.navigate(['/profile']);
      },
      error => {
        console.log(error.message);
      }
    );
  }
  
  onFileChange(event: any, fileType: string): void {
    const file = event.target.files[0];
    if (file) {
      if (fileType === 'image') {
        this.sheet.image = file;
        const reader = new FileReader();
        reader.onload = () => this.imagePreview = reader.result;
        reader.readAsDataURL(file);
      } else if (fileType === 'pdf') {
        this.sheet.pdfFile = file;
        this.pdfPreview = file.name;
        this.sheet.filename = file.name;
      }
    }
  }
  
  clearPreview(): void {
    this.imagePreview = null;
    this.pdfPreview = null;
  }

}
