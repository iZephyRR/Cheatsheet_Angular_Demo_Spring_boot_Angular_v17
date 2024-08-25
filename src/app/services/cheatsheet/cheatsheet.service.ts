import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Cheatsheet } from '../../model/cheatsheet';
import { ResponseMessage } from '../../model/ResponseMessage';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})

export class CheatsheetService {
  private baseUrl =  "http://localhost:8080/cheatsheet";

  constructor(private http:HttpClient,
    private authService : AuthService
  ) { }

  getAll():Observable<Cheatsheet[]>{
    return this.http.get<Cheatsheet[]>(`${this.baseUrl}/getAll`);
  }

  add(data : FormData) : Observable<ResponseMessage>{
    const token  = this.authService.getToken();
    const headers = new HttpHeaders({
      'CONTENT_TYPE' : 'application/json',
      'Authorization':  `Bearer ${token}` 
    });

    return this.http.post<ResponseMessage>(`${this.baseUrl}/create`, data,{headers})
        .pipe(
          catchError(this.handlerError<ResponseMessage>('Save cheatsheet'))
        );
  }

  getByCategory( cateId : number) : Observable<Cheatsheet[]> {
    return this.http.get<Cheatsheet[]> (`${this.baseUrl}/getCheatsheetsByCategory/${cateId}`);
  }

  getByUserId() : Observable<Cheatsheet[]> {
    const token  = this.authService.getToken();
    const headers = new HttpHeaders({
      'CONTENT_TYPE' : 'application/json',
      'Authorization':  `Bearer ${token}`
    });
    return this.http.get<Cheatsheet[]> (`${this.baseUrl}/getCheatsheetByCreatedBy`,{headers});
  }

  getByIdToUpdate(sheetId:number): Observable<Cheatsheet>{
    const token  = this.authService.getToken();
    const headers = new HttpHeaders({
      'CONTENT_TYPE' : 'application/json',
      'Authorization':  `Bearer ${token}`
    });
    return this.http.get<Cheatsheet>(`${this.baseUrl}/update/cheatsheet/${sheetId}`,{headers});
  }

  update (cheatsheet: FormData, sheetId : number) : Observable<ResponseMessage>{
    const token  = this.authService.getToken();
    const headers = new HttpHeaders({
      'CONTENT_TYPE' : 'application/json',
      'Authorization':  `Bearer ${token}`
    });
    return this.http.put<ResponseMessage>(`${this.baseUrl}/update/cheatsheet/${sheetId}`,cheatsheet,{headers})
    .pipe (
      catchError(this.handlerError<ResponseMessage>('Update cheatsheet'))
    );
  }

  delete (sheetId:number) : Observable<ResponseMessage>{
    const token  = this.authService.getToken();
    const headers = new HttpHeaders({
      'CONTENT_TYPE' : 'application/json',
      'Authorization':  `Bearer ${token}`
    });
    return this.http.delete<ResponseMessage>(`${this.baseUrl}/delete/${sheetId}`,{headers});
  }

  private handlerError<Cheatsheet>(operation = 'operation' , result?: Cheatsheet ){
    return (error : Cheatsheet): Observable<Cheatsheet> => {
      console.error(error); // log to console
      return of(result as Cheatsheet); // keep app running by returning empty result
    };
  }
}



