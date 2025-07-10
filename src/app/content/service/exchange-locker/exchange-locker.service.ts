import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {
  ExchangeLocker,
  CreateExchangeLockerDto,
  UpdateExchangeLockerDto,
  ExchangeLockerDetailsByUser
} from '../../model/exchange-locker/exchange-locker.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeLockerService {
  private readonly baseUrl = environment.baseUrl;
  private readonly headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAllExchangeLocker(): Observable<ExchangeLocker[]> {
    return this.http.get<ExchangeLocker[]>(`${this.baseUrl}/api/v2/exchange-lockers`, { headers: this.headers });
  }

  getExchangeLockerById(id: number): Observable<ExchangeLocker[]> {
    return this.http.get<ExchangeLocker[]>(`${this.baseUrl}/api/v2/exchange-lockers/${id}`, { headers: this.headers });
  }

  getExchangeLockerByExchangeId(exchangeId: number): Observable<ExchangeLocker[]> {
    return this.http.get<ExchangeLocker[]>(`${this.baseUrl}/api/v2/exchange-lockers/exchange/${exchangeId}`, { headers: this.headers });
  }

  getExchangeLockerByExchangeIdAndUserId(exchangeId: number, userId: number): Observable<ExchangeLockerDetailsByUser> {
    return this.http.get<ExchangeLockerDetailsByUser>(`${this.baseUrl}/api/v2/exchange-lockers/exchange/${exchangeId}/${userId}`, { headers: this.headers });
  }

  createExchangeLocker(data: CreateExchangeLockerDto): Observable<ExchangeLocker> {
    return this.http.post<ExchangeLocker>(`${this.baseUrl}/api/v2/exchange-lockers`, data, { headers: this.headers });
  }

  updateExchangeLocker(lockerId: number, data: UpdateExchangeLockerDto): Observable<ExchangeLocker> {
    return this.http.put<ExchangeLocker>(`${this.baseUrl}/api/v2/exchange-lockers/${lockerId}`, data, { headers: this.headers });
  }
}
