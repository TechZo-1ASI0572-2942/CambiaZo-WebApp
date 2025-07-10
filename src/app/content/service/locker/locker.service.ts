import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {CreateLockerDto, LockerModel} from '../../model/locker/locker.model';

@Injectable({
  providedIn: 'root'
})
export class LockerService {
  private readonly baseUrl = environment.baseUrl;
  private readonly headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAllLockers(): Observable<LockerModel[]> {
    return this.http.get<LockerModel[]>(`${this.baseUrl}/api/v2/lockers`, { headers: this.headers });
  }

  getLockerById(id: number): Observable<LockerModel> {
    return this.http.get<LockerModel>(`${this.baseUrl}/api/v2/lockers/${id}`, { headers: this.headers });
  }

  getLockersByLocation(locationId: number): Observable<LockerModel[]> {
    return this.http.get<LockerModel[]>(`${this.baseUrl}/api/v2/lockers/location/${locationId}`, { headers: this.headers });
  }

  createLocker(data: CreateLockerDto): Observable<LockerModel> {
    return this.http.post<LockerModel>(`${this.baseUrl}/api/v2/lockers`, data, { headers: this.headers });
  }
}
