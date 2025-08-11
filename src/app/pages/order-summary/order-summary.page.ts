import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule]
})
export class OrderSummaryPage implements OnInit {
  orderData: any = {};

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private userServ: UserService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['data']) {
      this.orderData = navigation.extras.state['data'];
      console.log('Received Order Data:', this.orderData);
    }
  }

  async presentBubbleLoader() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...\nDo not go back or cancel',
      spinner: 'bubbles',
      cssClass: 'custom-bubble-loader',
      backdropDismiss: false
    });
    await loading.present();
    return loading;
  }

  async payWithCoupon(mode: 'coupon' | 'wallet' | 'online') {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Payment',
      message: 'Are you sure you want to pay via your coupon wallet?',
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary' },
        {
          text: 'Yes, Pay Now',
          handler: async () => {
            this.orderData.payMode = mode;

            const loader = await this.presentBubbleLoader();

            try {
              const resp = await this.userServ.getLastReschargeOrderByuser(this.orderData, false);
              await loader.dismiss();
              if (resp) {
                this.navCtrl.navigateForward('/order-history');
              }
            } catch (e) {
              await loader.dismiss();
              this.showError('Payment failed, please try again.');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async showError(msg: string) {
    const errorAlert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });
    await errorAlert.present();
  }
}
