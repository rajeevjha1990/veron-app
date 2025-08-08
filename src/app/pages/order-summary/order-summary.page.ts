import { AlertController, NavController } from '@ionic/angular';
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
  orderData: any = {}
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private userServ: UserService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['data']) {
      this.orderData = navigation.extras.state['data'];
      console.log('Received Order Data:', this.orderData);
    }
  }
  async payWithCoupon(mode: 'coupon' | 'wallet' | 'online') {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Payment',
      message: 'Are you sure you want to pay via your coupon wallet?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Yes, Pay Now',
          handler: async () => {
            this.orderData.payMode = mode;
            const resp = await this.userServ.getLastReschargeOrderByuser(this.orderData);
            if (resp) {
              this.navCtrl.navigateForward('/order-history');
            }
          }
        }
      ]
    });
    await alert.present();
  }


}
