import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../../model/user';
import { catchError, Observable, of, throwError } from 'rxjs';
import { blob, json } from 'stream/consumers';
import { ResponseMessage } from '../../model/ResponseMessage';
import { Login } from '../../model/login';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl =  "http://localhost:8080/user";

  constructor(private http:HttpClient,
    private authService : AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // add(user : User) : Observable<ResponseMessage> {
  //   const headers = new HttpHeaders({
  //     'content-type' : 'application/json'
  //   });

  //   return this.http.post<ResponseMessage>(`${this.baseUrl}/signup`, user,{ headers })
  //       .pipe(
  //         catchError(this.handlerError<ResponseMessage>('Save User'))
  //       );
  // }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/showUsers`);
  }

  // login(login : Login) : Observable<ResponseMessage> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json' 
  //   });
  //   return this.http.post<ResponseMessage>(`${this.baseUrl}/login`,login,{headers});
  // }

  getOne() : Observable<User>{
    const token  = this.authService.getToken();
    const headers = new HttpHeaders({
      'CONTENT_TYPE' : 'application/json',
      'Authorization':  `Bearer ${token}`
    });
    return this.http.get<User>(`${this.baseUrl}/profile`,{headers});
  }

  private handlerError<User>(operation = 'operation' , result?: User ){
    return (error : User): Observable<User> => {
      console.error(error); // log to console
      return of(result as User); // keep app running by returning empty result
    };
  }
}
