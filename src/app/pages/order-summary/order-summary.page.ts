import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryPage implements OnInit {
  orderData: any = {};
  orderId: any = '';
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
    console.log(this.orderData);
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
      message: `Are you sure you want to pay via your ${mode} wallet?`,
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary' },
        {
          text: 'Yes, Pay Now',
          handler: async () => {
            this.orderData.payMode = mode;
            const loader = await this.presentBubbleLoader();

            try {
              const resp = await this.userServ.getLastReschargeOrderByuser(this.orderData, false);
              this.orderId = resp.order_id
              await loader.dismiss();
              const mainStatus = resp.status;
              const rechargeStatus = resp.api_response?.status?.toLowerCase() || '';

              if (mainStatus === 200) {
                switch (rechargeStatus) {
                  case 'success':
                    this.showInfo('Recharge successful! Redirecting to your order history.');
                    this.navCtrl.navigateForward('/order-history');
                    break;

                  case 'pending':
                    this.showInfo('Your recharge is pending. Please check order history after a few minutes.');
                    this.navCtrl.navigateForward(['/pending-order', this.orderId]);

                    break;

                  case 'failure':
                    this.showInfo('Recharge failed! Please try again later.');
                    this.router.navigate(['/plan-list']);
                    break;

                  case 'timeout':
                    this.showInfo('Recharge request timed out. Please check order history later.');
                    this.navCtrl.navigateForward(['/pending-order', this.orderId]);

                    break;

                  default:
                    this.showInfo(`Recharge status: ${rechargeStatus || 'unknown'}. Please verify in history.`);
                    this.navCtrl.navigateForward(['/pending-order', this.orderId]);
                    break;
                }

              } else if (mainStatus === 400) {
                // Here Custome message diplaying
                this.router.navigate(['/plan-list']);
              } else if (mainStatus === 403) {
                this.showInfo('Order creation failed. Please try again later.');
              } else if (mainStatus === 409) {
                //this.showInfo('You recently made a similar recharge. Please wait before retrying.');
              } else {
                this.showInfo(resp.err || resp.msg || 'Unknown error occurred. Please try again.');
              }

            } catch (err) {
              await loader.dismiss();
              this.showInfo('Something went wrong. Please try again.');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async showInfo(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Information',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
