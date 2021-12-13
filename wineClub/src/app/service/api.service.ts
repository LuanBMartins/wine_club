import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  baseUri:string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // ----- USER API ------

  createUser(data: any): Observable<any> {
    let url = `${this.baseUri}/user`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getUsers() {
    return this.http.get(`${this.baseUri}`);
  }

  getUser(id: number): Observable<any> {
    let url = `${this.baseUri}/user/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.errorHandler)
    )
  }

  updateUser(id: number, data: any): Observable<any> {
    let url = `${this.baseUri}/user/${id}`;
    return this.http.patch(url, data, { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    )
  }

  updateUserWine(id: number, data: any): Observable<any> {
    // Faltar criar a rota
    let url = `${this.baseUri}/wine/user/${id}`;

    console.log(data);
    
    return this.http.patch(url, data, { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    )
  }

  deleteUser(id: number): Observable<any> {
    let url = `${this.baseUri}/user/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    )
  }

  login(data: any): Observable<any> {
    let url = `${this.baseUri}/user/login`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  
  // WINE API

  searchWine(data: any): Observable<any> {
    let url = `${this.baseUri}/wine/search/advanced`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  searchWineName(): Observable<any> {
    let url = `${this.baseUri}/wine/search/names`;
    return this.http.get(url)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  searchWineId(id: any): Observable<any> {
    let url = `${this.baseUri}/wine/search/wines/${id}`;
    return this.http.get(url)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createWine(data: any): Observable<any> {
    const url = `${this.baseUri}/wine`

    return this.http.post(url, data)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}