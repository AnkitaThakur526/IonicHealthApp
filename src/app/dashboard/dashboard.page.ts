import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionService } from '../services/prediction.service'; // Import PredictionService
import { AuthService } from '../services/auth.service'; // Import AuthService
import { ModalController } from '@ionic/angular'; // Import ModalController
import { PredictionDetailsModalComponent } from '../prediction-details-modal/prediction-details-modal.component'; // Import the modal component

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  records: any[] = [];
  currentUser: any; // Store the current user's data

  // Mapping for condition color levels
  conditionMapping: { [key: string]: string } = {
    Healthy: 'green',
    'Near Risk': 'yellow',
    Obese: 'orange',
    'Highly Risk': 'red',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private predictionService: PredictionService, // Inject PredictionService
    private modalController: ModalController // Inject ModalController
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
    this.loadRecords();
  }

  // Fetch the current user information
  async loadCurrentUser() {
    this.currentUser = await this.authService.getUserData(); // Get user info from AuthService
  }

  // Fetch records for the logged-in user
  loadRecords() {
    this.authService.getToken().then((token) => {
      if (token) {
        this.predictionService.getPredictions(token).subscribe(
          (response) => {
            // Update records with the fetched predictions
            this.records = response.predictions;
          },
          (error) => {
            console.error('Error fetching predictions', error);
            // Handle error: Show a message to the user
            alert('Unable to load predictions. Please try again later.');
          }
        );
      } else {
        console.error('Error retrieving token');
        this.router.navigate(['/login']); // Redirect to login if no token
      }
    });
  }

  // Show the detailed information in a modal when a record card is clicked
  async showDetails(record: any) {
    const modal = await this.modalController.create({
      component: PredictionDetailsModalComponent, // Modal component
      componentProps: { record: record }, // Pass the record data to the modal
    });
    return await modal.present();
  }

  // Function to return color based on prediction result
  getConditionColor(predictionResult: string): string {
    return this.conditionMapping[predictionResult] || 'black'; // Default to black if unknown condition
  }

  // Logout function (clear token and redirect to login)
  logout() {
    this.authService.removeToken(); // Clear stored token
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Navigate to the prediction form page
  goToPrediction() {
    this.router.navigate(['/form']); // Navigate to the form for submitting new predictions
  }
}
