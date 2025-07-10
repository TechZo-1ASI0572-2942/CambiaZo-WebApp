import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeadquartersService {

  baseUrl = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }

  getHeadquarters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v2/locations`, { headers: this.headers });
  }
  
}
