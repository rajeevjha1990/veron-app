import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [...SHARED_IONIC_MODULES],
})
export class HomePage {
  mobilerechargeDatas: any = []
  electricityDatas: any = [];
  services = [
    { icon: 'phone-portrait-outline', line1: 'Mobile', line2: 'Recharge' },
    { icon: 'flash-outline', line1: 'Electricity', line2: 'Bill' },
    { icon: 'pricetag-outline', line1: 'Coupon', line2: 'code' },
    { icon: 'swap-horizontal-outline', line1: 'Money', line2: 'Transfer' }
  ];


  constructor(
    private userService: UserService,
    private router: NavController
  ) { }
  async ngOnInit() {
    const history = await this.userService.rechargeHistory();
    this.mobilerechargeDatas = history.mobileRecharge;
    this.electricityDatas = history.electricityRecharge;
  }
  goToMobileRechargeHistory() {
    this.router.navigateForward(['/all-mobilecharges']);
  }

  goToElectricityRechargeHistory() {
    this.router.navigateForward(['/all-electriccharges']);
  }
  openService(service: any) {

  }
}
