import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../../model/ResponseMessage';
import { Category } from '../../model/category';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl =  "http://localhost:8080/category";

  constructor(private http: HttpClient,
    private authService : AuthService,
    @Inject(PLATFORM_ID) private platformId : Object
  ) { }

  add(category : Category, ) : Observable<ResponseMessage> {
    const token  = this.authService.getToken();
    const headers = new HttpHeaders({
      'CONTENT_TYPE' : 'application/json',
      'Authorization':  `Bearer ${token}`
    });
    return this.http.post<ResponseMessage>(`${this.baseUrl}/create`,category,{headers});
  }

  getAll() : Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/getAll`);
  }


}
