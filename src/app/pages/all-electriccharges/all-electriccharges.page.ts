import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-all-electriccharges',
  templateUrl: './all-electriccharges.page.html',
  styleUrls: ['./all-electriccharges.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule,]
})
export class AllElectricchargesPage implements OnInit {
  electricityDatas: any[] = [];
  allElectricityData: any[] = [];
  page = 0;
  limit = 5;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    const history = await this.userService.rechargeHistory();
    this.allElectricityData = history.electricityRecharge || [];
    this.loadMoreItems();
  }

  loadMore(event?: any) {
    this.loadMoreItems();

    if (event) {
      event.target.complete();

      if (this.page * this.limit >= this.allElectricityData.length) {
        event.target.disabled = true;
      }
    }
  }

  loadMoreItems() {
    const start = this.page * this.limit;
    const end = start + this.limit;
    const chunk = this.allElectricityData.slice(start, end);
    this.electricityDatas = this.electricityDatas.concat(chunk);
    this.page++;
  }
}
