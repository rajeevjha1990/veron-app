import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule]
})
export class ChangePasswordPage implements OnInit {
  formData: any = {
    old_password: '',
    new_password: '',
    confirm_password: ''
  };
  errors: any = {};

  constructor(
    private userService: UserService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router,

  ) { }

  ngOnInit() { }

  async changePassword() {
    this.errors = {};
    if (!this.formData.old_password) {
      this.errors.old_password = 'Old password is required';
    }
    if (!this.formData.new_password) {
      this.errors.new_password = 'New password is required';
    } else if (this.formData.new_password.length < 6) {
      this.errors.new_password = 'Minimum 6 characters required';
    }
    if (!this.formData.confirm_password) {
      this.errors.confirm_password = 'Confirm password is required';
    } else if (this.formData.new_password !== this.formData.confirm_password) {
      this.errors.confirm_password = 'Passwords do not match';
    }

    // Stop if any error
    if (Object.keys(this.errors).length > 0) return;

    try {
      const resp = await this.userService.changePassword({
        old_password: this.formData.old_password,
        new_password: this.formData.new_password,
        confirm_password: this.formData.confirm_password
      });
      console.log(resp);
      switch (resp.status) {
        case 403:
          this.router.navigate(['/change-password']);
          break;
        case 200:
          this.router.navigate(['/login']);
          break
      }
    } catch (err) {
      this.showAlert('Error', 'Something went wrong');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    await toast.present();
  }
}
