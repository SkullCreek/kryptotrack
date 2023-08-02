import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  loginUser(data: any){
    return this.http.post<any>("http://localhost:5000/login",data).pipe(catchError(this.handleError));
  }

  signupUser(data: any){
    return this.http.post<any>("http://localhost:5000/signup",data).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<any>{
    if(error.error instanceof ErrorEvent){
      return throwError("Network Error");
    }
    else if(error.status == 404){
      return throwError("Not Found");
    }
    else if(error.status == 400){
      return throwError("Bad Request");
    }
    return throwError("Something went wront please try again");
    
  }
}
