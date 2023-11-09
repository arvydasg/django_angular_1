import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // service that makes a call to the backend and fetches ALL the data that is provided in the
  // /movies/ url.

  baseurl = "http://127.0.0.1:8000/";

  // httpHeaders It helps both the client and the server understand the data being exchanged
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any> {
    return this.http.get(this.baseurl + "movies/",
    {headers: this.httpHeaders});
  }

  getOneMovie(id : number): Observable<any> {
    return this.http.get(this.baseurl + "movies/" + id + '/',
    {headers: this.httpHeaders});
  }

}
