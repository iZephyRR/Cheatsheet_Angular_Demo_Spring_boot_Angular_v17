import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SendDocumentService } from '../services/send-document/send-document.service';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-send-document',
  templateUrl: './send-document.component.html',
  styleUrl: './send-document.component.css'
})
export class SendDocumentComponent {
  
  public pdfFile!: File;
  public filename?: string;
  public filePreview?: string;
  public fileType?: string;
  public receiver! : string;

  constructor(
    private sendDocumentService: SendDocumentService,
    private messageService: MessageService
  ) { }

  

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      this.filename = file.name;
      this.fileType = file.type;

      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  send(form: NgForm): void {
    console.log('Send method called');
    const formData = new FormData();
    formData.append('username',this.receiver);
    if (this.pdfFile) {
      formData.append('pdfFile', this.pdfFile);
      formData.append('filename', this.filename || '');
    }
    this.sendDocumentService.send(formData).subscribe(
      response => {
        console.log(response.message);
        this.messageService.showSuccess(response.message);
        form.reset();
        this.clearPreview();
      },
      error => {
        this.messageService.showError("Error Sending!")
      }
    );
  }
  clearPreview(): void {
    this.filePreview = undefined;
    this.filename = undefined;
    this.fileType = undefined;
  }
  isImage(): boolean {
    return this.fileType?.startsWith('image/') || false;
  }

  isVideo(): boolean {
    return this.fileType?.startsWith('video/') || false;
  }

  isAudio(): boolean {
    return this.fileType?.startsWith('audio/') || false;
  }
}
