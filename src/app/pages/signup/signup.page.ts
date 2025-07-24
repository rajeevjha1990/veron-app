import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, RouterLink, FormsModule]
})
export class SignupPage implements OnInit {
  formData: any = {}
  constructor(
    private userServ: UserService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }
  async newRegistration() {
    if (!this.formData.consumer_name || this.formData.consumer_name.trim() === '') {
      await this.showAlert('Name is required.');
      return;
    }
    if (!this.formData.email || this.formData.email.trim() === '') {
      await this.showAlert('Email is required.');
      return;
    }
    if (!this.formData.mobile_no) {
      await this.showAlert('Mobile number is required.');
      return;
    }
    if (!this.formData.password || this.formData.password.trim() === '') {
      await this.showAlert('Password is required.');
      return;
    }
    const resp = await this.userServ.consumerRegistration(this.formData);
    if (resp && resp.status === 200) {
      this.navCtrl.navigateForward('/login');
    }
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
