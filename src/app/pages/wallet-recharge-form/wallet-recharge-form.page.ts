import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-wallet-recharge-form',
  templateUrl: './wallet-recharge-form.page.html',
  styleUrls: ['./wallet-recharge-form.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule]
})
export class WalletRechargeFormPage implements OnInit {
  formdata: any = {
    amount: '',
    ref_number: '',
    pay_date: '',
    remark: '',
    pay_mode: ''
  }

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private userServ: UserService
  ) { }

  ngOnInit() { }

  async submitSection() {
    const { amount, ref_number, pay_date, pay_mode } = this.formdata;

    if (!amount || Number(amount) <= 0) {
      await this.showAlert('Please enter a valid amount.');
      return;
    }

    if (!ref_number || String(ref_number).trim() === '') {
      await this.showAlert('Reference number is required.');
      return;
    }

    if (!pay_date) {
      await this.showAlert('Payment date is required.');
      return;
    }

    if (!pay_mode || String(pay_mode).trim() === '') {
      await this.showAlert('Please select a payment mode.');
      return;
    }
    const resp = await this.userServ.walletRecharge(this.formdata);
    if (resp) {
      this.navCtrl.navigateForward('/home');
    }

  }

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Validation',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
