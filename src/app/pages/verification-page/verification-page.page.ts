import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { UserService } from 'src/app/services/user/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-page',
  templateUrl: './verification-page.page.html',
  styleUrls: ['./verification-page.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule]
})
export class VerificationPagePage implements OnInit {
  otpData: any = {}
  otpCode: any = {}
  showOtpInput: boolean = false;
  otp: any = '';
  expiryTime: any = '';
  formData: any = {}
  timer: number = 0;
  otpTimer: any
  otpInterval: any;
  constructor(
    private userServ: UserService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      this.otp = nav.extras.state['otp'];
      this.expiryTime = nav.extras.state['expiryTime'];
    }
  }
  async submit() {
    if (!this.formData.mobile) {
      await this.showAlert('Mobile number is required.');
      return;
    }
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobileRegex.test(this.formData.mobile)) {
      await this.showAlert('Please enter a valid 10-digit mobile number.');
      return;
    }
    const resp = await this.userServ.checkMobileRegisterorNot(this.formData);
    console.log(resp);
    switch (resp.status) {
      case 200:
        this.showOtpInput = true;
        this.startOtpTimer(resp.expiryTime);
        this.otpData = {
          otp: resp.generatedotp,
          mobile: resp.mobile
        };
        break;
      case 404:
        this.router.navigate(['/signup']);
        break;
      case 403:
        this.showOtpInput = false;
        break
      default:
        this.showAlert(resp.err || "Login failed. Please try again.");
        break;
    }
  }
  async verifyOtp() {
    const code = String(this.otpCode || '').trim();

    if (code.length < 4) {
      await this.showAlert('Please enter a valid OTP.');
      return;
    }
    this.otpData.otp = code;
    const verifyResp = await this.userServ.verifyRegistrationOtp(this.otpData);
    console.log(verifyResp);
    switch (verifyResp.status) {
      case 200:
        this.navCtrl.navigateForward('/login');
        break
      case 403:
        this.showOtpInput = false;
        break
      default:
        this.showAlert(verifyResp.err || "Login failed. Please try again.");
        break;

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
  sanitizeMobile(event: any) {
    let value = event.detail.value || '';
    value = value.replace(/[^0-9]/g, '');
    this.formData.mobile = value;
  }
  startOtpTimer(expiryTimeStr: string) {
    const expiryTime = new Date(expiryTimeStr).getTime();
    const now = Date.now();
    this.otpTimer = Math.max(Math.floor((expiryTime - now) / 1000), 0);
    if (this.otpInterval) clearInterval(this.otpInterval);
    this.otpInterval = setInterval(() => {
      if (this.otpTimer > 0) {
        this.otpTimer--;
      } else {
        clearInterval(this.otpInterval);
      }
    }, 1000);
  }

}
