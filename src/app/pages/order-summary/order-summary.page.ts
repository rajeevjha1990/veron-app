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

            // Show loader immediately
            const loader = await this.presentBubbleLoader();

            try {
              const resp = await this.userServ.getLastReschargeOrderByuser(this.orderData, false);

              switch (resp.status) {
                case 200: // Success
                  await loader.dismiss(); // hide loader
                  this.navCtrl.navigateForward('/order-history');
                  break;

                case 400: // Insufficient balance / duplicate recharge
                  await loader.dismiss();
                  this.router.navigate(['/plan-list']);
                  break;

                case 403: // Order creation failed
                  await loader.dismiss();
                  break;

                case 409: // Conflict - recent recharge
                  await loader.dismiss();
                  break;

                default: // unknown
                  await loader.dismiss();
                  this.showError(resp.err || resp.msg || 'Unknown error occurred.');
                  break;
              }
            } catch (err) {
              await loader.dismiss();
              this.showError('Something went wrong. Please try again.');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async showSuccess(msg: string) {
    const successAlert = await this.alertCtrl.create({
      header: 'Success',
      message: msg,
      buttons: ['OK']
    });
    await successAlert.present();
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
