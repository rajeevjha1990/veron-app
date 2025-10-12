import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { UserService } from 'src/app/services/user/user.service';
import { RajeevhttpService } from 'src/app/services/http/rajeevhttp.service';
import { User } from 'src/app/data-types/user';
import { NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class OrderHistoryPage implements OnInit {
  consumerrecharges: any = []
  mobilerechargeDatas: any = []
  electricityDatas: any = [];
  user: User = new User();
  transactions: any = [];
  constructor(
    private userServ: UserService,
    public veronHttp: RajeevhttpService,
    private router: NavController,
  ) {
    this.userServ.user.subscribe(async u => {
      this.user = u;
    });
  }
  ngOnInit() {
  }
  async ionViewDidEnter() {
    this.transactions = await this.userServ.transactionHistory();
  }

  downloadFile(url: string) {
    window.open(url, '_blank');
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
