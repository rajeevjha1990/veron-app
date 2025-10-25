import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  transactions: any[] = [];
  user: User = new User();

  constructor(
    private userServ: UserService,
    private veronHttp: RajeevhttpService,
    private router: NavController,
    private cdr: ChangeDetectorRef
  ) {
    this.userServ.user.subscribe(u => {
      this.user = u;
    });
  }

  ngOnInit() { }

  async ionViewDidEnter() {
    const resp = await this.userServ.transactionHistory();
    this.transactions = resp?.data || resp; // handle both formats
    console.log('Transactions:', this.transactions);
    this.cdr.markForCheck();
  }

  downloadFile(url: string) {
    window.open(url, '_blank');
  }

  goToPage(route: string) {
    this.router.navigateForward([route]);
  }
}
