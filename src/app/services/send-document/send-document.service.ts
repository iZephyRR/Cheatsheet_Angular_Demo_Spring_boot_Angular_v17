import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../../model/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class SendDocumentService {
  private baseUrl =  "http://localhost:8080/cheatsheet";

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  send (data : FormData) : Observable<ResponseMessage>{
    const token  = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization':  `Bearer ${token}` 
    });

    return this.http.post<ResponseMessage>(`${this.baseUrl}/send-document`, data,{headers});
  }


}
