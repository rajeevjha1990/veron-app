import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.page.html',
  styleUrls: ['./coupon-details.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule]
})
export class CouponDetailsPage implements OnInit {
  coupons: any[] = [];
  constructor(
    private userServ: UserService
  ) { }

  async ngOnInit() {
    this.coupons = await this.userServ.consumerCoupons();
    // console.log(this.coupons);
  }

}
