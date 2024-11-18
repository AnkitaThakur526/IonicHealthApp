import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    this.authService.login(this.email, this.password).subscribe(
      async (response) => {
        if (response.token) {
          await this.authService.saveToken(response.token);
          alert('Login successful');
          const userData = {
            email: this.email,
          };

          this.authService.saveUserData(userData); // Save the user data
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login failed');
        }
      },
      (error) => {
        alert('Login failed');
        console.error(error);
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
