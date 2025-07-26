import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { UserService } from 'src/app/services/user/user.service';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    ...SHARED_IONIC_MODULES,
    RouterLink,
    FormsModule
  ]
})
export class LoginPage implements OnInit {
  formData = {
    email: '',
    password: ''
  };
  loginMode: string = 'password';
  otpSent: boolean = false;
  otpData = {
    mobile: '',
    otp: ''
  };
  timer: number = 0;
  otpTimer: any
  constructor(
    private userServ: UserService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() { }

  async loginClick() {
    if (!this.formData.email || this.formData.email.trim() === '') {
      await this.showAlert('Email is required.');
      return;
    }

    if (!this.formData.password || this.formData.password.trim() === '') {
      await this.showAlert('Password is required.');
      return;
    }

    const resp = await this.userServ.login(this.formData);
    if (resp && resp.authkey) {
      this.router.navigate(['/home']);
    } else {
      await this.showAlert('Login failed. Invalid credentials.');
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

  async sendOtp() {
    const resp = await this.userServ.sendotp(this.otpData);
    if (resp && resp.otp_expires_at) {
      this.otpSent = true;
      const expiryTime = new Date(resp.otp_expires_at).getTime();
      const now = Date.now();
      const timeLeft = Math.floor((expiryTime - now) / 1000);
      this.timer = Math.max(timeLeft, 0);


      this.timer = timeLeft > 0 ? timeLeft : 0;

      if (this.otpTimer) clearInterval(this.otpTimer);

      this.otpTimer = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.otpTimer);
          this.otpSent = false;
        }
      }, 1000);
    } else {
      setTimeout(() => {
        this.router.navigate(['/signup']);
      }, 2000);

    }
  }
  async verifyOtp() {
    const resp = await this.userServ.verifyotp(this.otpData);
    if (resp && resp.authkey) {
      this.router.navigate(['/home']);
    }
  }

}
