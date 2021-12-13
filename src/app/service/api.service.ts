import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // ----- USER API ------

  createUser(data: any): Observable<any> {
    let url = `/user`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getUsers() {
    return this.http.get(``);
  }

  getUser(id: number): Observable<any> {
    let url = `/user/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.errorHandler)
    )
  }

  updateUser(id: number, data: any): Observable<any> {
    let url = `/user/${id}`;
    return this.http.patch(url, data, { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    )
  }

  deleteUser(id: number): Observable<any> {
    let url = `/user/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    )
  }

  login(data: any): Observable<any> {
    let url = `/user/login`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  
  // WINE API

  searchWine(data: any): Observable<any> {
    let url = `/wine/search/advanced`;
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