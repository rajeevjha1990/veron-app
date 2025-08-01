import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-coupon-recharge-form',
  templateUrl: './coupon-recharge-form.page.html',
  styleUrls: ['./coupon-recharge-form.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CouponRechargeFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
