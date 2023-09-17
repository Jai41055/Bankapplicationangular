import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*'),
};

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  URL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  createNewAccount(payload: any): Observable<any> {
    return this.http.post(
      this.URL + '/feature/createAccount',
      payload,
      HTTP_OPTIONS
    );
  }

  transacion(payload: any): Observable<any> {
    return this.http.post(
      this.URL + '/feature/transfer',
      payload,
      HTTP_OPTIONS
    );
  }

  getInterest(payload: any): Observable<any> {
    return this.http.post(
      this.URL + '/feature/interest',
      payload,
      HTTP_OPTIONS
    );
  }

  getBalance(payload: any): Observable<any> {
    return this.http.post(this.URL + '/feature/balance', payload, HTTP_OPTIONS);
  }
}
