import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular'; // Import ModalController

@Component({
  selector: 'app-prediction-details-modal',
  templateUrl: './prediction-details-modal.component.html',
  styleUrls: ['./prediction-details-modal.component.scss'],
})
export class PredictionDetailsModalComponent {
  @Input() record: any; // The record data passed from the DashboardPage

  constructor(private modalController: ModalController) {}

  // Method to dismiss (close) the modal
  dismiss() {
    this.modalController.dismiss();
  }
}
