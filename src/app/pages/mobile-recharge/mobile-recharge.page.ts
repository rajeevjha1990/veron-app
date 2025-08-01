import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { PubService } from 'src/app/services/pub/pub.service';
import { StatefilterPage } from '../statefilter/statefilter.page';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-mobile-recharge',
  templateUrl: './mobile-recharge.page.html',
  styleUrls: ['./mobile-recharge.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ...SHARED_IONIC_MODULES]
})
export class MobileRechargePage implements OnInit {
  operators: any[] = [];
  circles: any[] = [];
  formData: any = {
    mobile: '',
    operator: '',
    circle: '',
    state_id: ''
  };

  constructor(
    private pubServ: PubService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private storServ: StorageService,
    private alertCtrl: AlertController
  ) { }

  async ngOnInit() {
    this.operators = await this.pubServ.getOperators();
    this.circles = await this.pubServ.getCircles();
  }

  async StateList() {
    const modal = await this.modalCtrl.create({
      component: StatefilterPage
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.state) {
      this.formData.circle = data.state.state_name;
      this.formData.state_id = data.state.id;
    }
  }

  async submitSection() {
    const mobile = String(this.formData.mobile || '').trim();

    if (!mobile) {
      await this.showAlert('Mobile number is required.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      await this.showAlert('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!this.formData.operator || this.formData.operator.trim() === '') {
      await this.showAlert('Operator is required.');
      return;
    }

    if (!this.formData.circle || this.formData.circle.trim() === '') {
      await this.showAlert('Circle is required.');
      return;
    }
    this.storServ.setFormData(this.formData);
    this.navCtrl.navigateForward('/plan-list');
  }
  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Validation Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
