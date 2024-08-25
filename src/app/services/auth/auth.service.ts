import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, Observable, of } from 'rxjs';
import { AuthBoolean } from './AuthBoolean';
import { isPlatformBrowser } from '@angular/common';
import { ResponseMessage } from '../../model/ResponseMessage';
import { Login } from '../../model/login';
import { User } from '../../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl =  "http://localhost:8080/auth";
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(login : Login) : Observable<ResponseMessage> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    return this.http.post<ResponseMessage>(`${this.baseUrl}/login`,login,{headers});
  }

  // request otp
  requestOTP(email: String): void {
    console.log("auth service request otp: " + email);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post<string>(`${this.baseUrl}/requestotp`, JSON.stringify({ email }), { headers })
      .subscribe({
        next: (response) => console.log('OTP sent successfully:', response),
        error: (error) => console.error('Error sending OTP:', error)
      });
  }

  // register
  register(user : User) : Observable<ResponseMessage> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });

    return this.http.post<ResponseMessage>(`${this.baseUrl}/signup`, user,{ headers })
        .pipe(
          catchError(this.handlerError<ResponseMessage>('Save User'))
        );
  }

  getUserId () : number | null {
    const token = this.getToken();
    if(token) {
      return this.jwtHelper.decodeToken(token).userId;
    }
    return null;
  }

  getStatus(token : string) : number | null  {
   return this.jwtHelper.decodeToken(token).status;
  }

  getRole(token : string) : string | null {
    return this.jwtHelper.decodeToken(token).role;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if(token) {
      return true;
    }      
    return false;
  }

  isLoggedInAdmin() : boolean {
    const token = this.getToken();
    if(token){
      const role  = this.jwtHelper.decodeToken(token).role;
      if(role === 'ADMIN') {
        return true;
      }
    }      
    return false;
  }

  getToken(): string | null {
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private handlerError<User>(operation = 'operation' , result?: User ){
    return (error : User): Observable<User> => {
      console.error(error); // log to console
      return of(result as User); // keep app running by returning empty result
    };
  }

}
