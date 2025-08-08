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
    mobile: '',
    password: '',
    otp: ''

  };
  loginMode: string = 'password';
  otpSent: boolean = false;
  otpData = {
    mobile: '',
    otp: ''
  };
  timer: number = 0;
  otpTimer: any
  otpInterval: any;

  constructor(
    private userServ: UserService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() { }

  async loginClick() {
    const mobile = this.formData.mobile?.toString().trim();
    const password = this.formData.password?.trim();

    if (!mobile || !password) {
      this.showAlert('Mobile number and password are required.');
      return;
    }

    const mobilePattern = /^[6-9]\d{9}$/;
    if (!mobilePattern.test(mobile)) {
      this.showAlert('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (password.length < 4) {
      this.showAlert('Password must be at least 4 characters.');
      return;
    }
    try {
      const resp = await this.userServ.login({ mobile, password });
      console.log(resp);
      if (resp && resp.expiryTime) {
        this.formData.otp = resp.generatedotp;
        this.otpSent = true;
        this.startOtpTimer(resp.expiryTime);
      } else {
        this.router.navigate(['/signup'], {
          state: {
            consumer_name: resp.consumer_name,
            mobile_no: resp.mobile_no,
            email: resp.email
          }
        });

      }
    } catch (err: any) {
      const errorMsg = err.error?.message || err.error?.err || 'Login failed. Please try again.';
      this.showAlert(errorMsg);
    }
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

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  async verifyOtp() {
    this.otpData.mobile = this.formData.mobile;
    this.otpData.otp = this.formData.otp;
    const resp = await this.userServ.verifyotp(this.otpData);
    if (resp && resp.authkey) {
      this.router.navigate(['/home']);
    }
  }


}
