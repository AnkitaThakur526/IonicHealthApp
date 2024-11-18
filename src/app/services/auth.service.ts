import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://web-service-gxkq.onrender.com/api';

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  async saveToken(token: string): Promise<void> {
    await Preferences.set({ key: 'authToken', value: token });
  }

  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'authToken' });
    return value;
  }

  // Save user data to preferences
  async saveUserData(userData: any): Promise<void> {
    await Preferences.set({ key: 'userData', value: JSON.stringify(userData) });
  }

  // Retrieve user data from preferences
  async getUserData(): Promise<any | null> {
    const { value } = await Preferences.get({ key: 'userData' });
    return value ? JSON.parse(value) : null; // Parse JSON if data exists
  }

  async removeToken(): Promise<void> {
    await Preferences.remove({ key: 'authToken' });
  }
}
