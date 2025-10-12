import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.page.html',
  styleUrls: ['./pending-order.page.scss'],
  standalone: true,
  imports: [SHARED_IONIC_MODULES],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendingOrderPage implements OnInit, OnDestroy {
  orderId: string = '';
  orderDetails: any = {};
  interval: any;

  constructor(
    private route: ActivatedRoute,
    private userServ: UserService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.orderId = params.get('orderId') || '';
      await this.loadOrderDetails();
      // call function every 1 minute
      this.interval = setInterval(async () => {
        await this.loadOrderDetails();
      }, 60000);
    });
  }

  async loadOrderDetails() {
    try {
      this.orderDetails = await this.userServ.pendingOrderDetails(this.orderId);

      if (this.orderDetails?.status === 'Success' || this.orderDetails?.status === 'failure') {
        this.navCtrl.navigateForward(['/order-history']);
      }
    } catch (error) {
    }
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
