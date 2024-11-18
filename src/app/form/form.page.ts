import { Component } from '@angular/core';
import { PredictionService } from '../services/prediction.service'; // Service for API call
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage {
  // Declare the form fields as variables
  age!: number;
  sex!: string;
  cp!: number;
  trestbps!: number;
  chol!: number;
  fbs!: number;
  restecg!: number;
  thalach!: number;
  exang!: number;
  oldpeak!: number;
  slope!: number;
  ca!: number;
  thal!: number;

  constructor(
    private predictionService: PredictionService,
    private router: Router,
    private authService: AuthService
  ) {}

  // Function to handle the form submission
  submitForm() {
    const formData = {
      age: this.age,
      sex: this.sex,
      cp: this.cp,
      trestbps: this.trestbps,
      chol: this.chol,
      fbs: this.fbs,
      restecg: this.restecg,
      thalach: this.thalach,
      exang: this.exang,
      oldpeak: this.oldpeak,
      slope: this.slope,
      ca: this.ca,
      thal: this.thal,
    };

    // Send the form data to the Flask API through the prediction service
    this.authService.getToken().then((token) => {
      console.log(token);
      if (token) {
        this.predictionService.submitPrediction(formData, token).subscribe(
          (response) => {
            console.log('Prediction received:', response);
            // Redirect to the dashboard or show the result
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.error('Error submitting form:', error);
          }
        );
      } else {
        console.error('Error retrieving token');
      }
    });
  }
}
