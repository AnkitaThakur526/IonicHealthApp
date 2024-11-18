import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  private baseUrl = 'https://web-service-gxkq.onrender.com/api';

  constructor(private http: HttpClient) {}

  getPredictions(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/predictions`, { headers });
  }

  // Submit prediction with token authorization
  submitPrediction(data: any, token: string): Observable<any> {
    // Adding 'Bearer' before the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/predict`, data, { headers });
  }
}
