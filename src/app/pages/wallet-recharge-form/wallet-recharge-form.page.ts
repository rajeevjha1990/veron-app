import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';

@Component({
  selector: 'app-wallet-recharge-form',
  templateUrl: './wallet-recharge-form.page.html',
  styleUrls: ['./wallet-recharge-form.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule]
})
export class WalletRechargeFormPage implements OnInit {
  orderData: any = {}
  walletbalance: any = {}
  constructor(
    private router: Router
  ) { }

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['data']) {
      this.orderData = navigation.extras.state['data'];
    }

  }
}
