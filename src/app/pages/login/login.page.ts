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
    // const password = this.formData.password;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/;

    // if (!passwordRegex.test(password)) {
    //   await this.showAlert(
    //     'Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.'
    //   );
    //   return;
    // }

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
}
