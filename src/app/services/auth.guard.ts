import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if token exists
    const token = localStorage.getItem('CapacitorStorage.authToken');
    if (token) {
      // Token exists, allow access to the route
      return true;
    } else {
      // No token, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
