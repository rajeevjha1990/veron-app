import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/data-types/user';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    ...SHARED_IONIC_MODULES,
    CommonModule,

  ],
})

export class HomePage {
  mobilerechargeDatas: any = []
  electricityDatas: any = [];
  swiper: any;

  services = [
    {
      icon: 'phone-portrait-outline',
      line1: 'Mobile',
      line2: 'Recharge',
      route: '/mobile-recharge'
    },
    {
      icon: 'flash-outline',
      line1: 'Electricity',
      line2: 'Bill',
      route: '/electricity-bill'
    },
    {
      icon: 'ticket-outline',
      line1: 'Coupon',
      line2: 'Code',
      route: '/coupon-code'
    },
    {
      icon: 'swap-horizontal-outline',
      line1: 'Money',
      line2: 'Transfer',
      route: '/money-transfer'
    }
  ];
  ads = [
    {
      image: 'assets/ads/add1.jpg', title: 'You Refer Friends', subtitle: 'Share your referral link with friends. They get INR 10.'
    },
    {
      image: 'assets/ads/add2.png', title: 'Your Friends Register', subtitle: 'Your friends Register with using your referral link.'
    },
    {
      image: 'assets/ads/add3.jpg', title: 'Earn You', subtitle: 'You get INR 10. You can use these credits to take recharge.'
    }
  ];
  user: User = new User();

  constructor(
    private userService: UserService,
    private router: NavController,
    private userServ: UserService
  ) {
    this.userServ.user.subscribe(async u => {
      this.user = u;
    });
    console.log(this.user)
  }
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
  goToPage(route: string) {
    this.router.navigateForward([route]);
  }

}
