import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { UserService } from 'src/app/services/user/user.service';
import { RajeevhttpService } from 'src/app/services/http/rajeevhttp.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule]
})
export class OrderHistoryPage implements OnInit {
  consumerrecharges: any = []
  constructor(
    private userServ: UserService,
    public veronHttp: RajeevhttpService
  ) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    this.consumerrecharges = await this.userServ.consumerRescharges()
  }
  downloadFile(url: string) {
    window.open(url, '_blank');
  }

}
