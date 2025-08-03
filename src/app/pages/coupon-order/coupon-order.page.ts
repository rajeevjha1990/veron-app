import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';

@Component({
  selector: 'app-coupon-order',
  templateUrl: './coupon-order.page.html',
  styleUrls: ['./coupon-order.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule]
})
export class CouponOrderPage implements OnInit {
  couponData = {
    coupon_name: 'VERONMONEYCOUPOUN',
    coupon_code: 'XMAS2025',
    coupon_value: 5000,
    price: 2500,
    currency: 'INR'
  };

  constructor() { }

  ngOnInit() {
  }
  openPayment() {
    const payuUrl = 'https://api.payu.in/public/#/afd97d0e4bf584d214d7e0453d88f15e/paymentoptions';
    window.open(payuUrl, '_self');
  }

}
