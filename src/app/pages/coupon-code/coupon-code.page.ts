import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-coupon-code',
  templateUrl: './coupon-code.page.html',
  styleUrls: ['./coupon-code.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule]
})
export class CouponCodePage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  getCoupon() {
    this.navCtrl.navigateForward('/coupon-order');
  }

}
