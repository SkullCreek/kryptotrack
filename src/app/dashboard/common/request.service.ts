import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  
  ListCrypto(){
    return this.http.get<any>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD").pipe(catchError(this.handleError));
  }

  CryptoData(id: string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${id}`).pipe(catchError(this.handleError));
  }

  ChartData(id: string, currency: string, days: number = 365){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`).pipe(catchError(this.handleError));
  }

  StorePriceAlert(formdata: any){
    return this.http.post<any>(`http://127.0.0.1:5000/priceAlert`,formdata).pipe(catchError(this.handleError));
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
