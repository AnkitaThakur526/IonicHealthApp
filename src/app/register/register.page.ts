import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.email, this.password).subscribe(
      (response: { message: any; }) => {
        alert(response.message);
        this.router.navigate(['/login']); // Redirect to login after successful registration
      },
      (error: any) => {
        alert('Registration failed');
        console.error(error);
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']); // Redirect to login page
  }
}
