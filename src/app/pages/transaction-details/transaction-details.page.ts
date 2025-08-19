import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.page.html',
  styleUrls: ['./transaction-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class TransactionDetailsPage implements OnInit {
  transactionDetails: any = {};
  orderId: number = 0;

  constructor(
    private userServ: UserService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.orderId = parseInt(orderId, 10);
    }
    const transactions = await this.userServ.transactionHistory();
    this.transactionDetails = transactions.find((trns: any) => trns.id == this.orderId) || {};
    console.log(this.transactionDetails);
  }
}
