import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';

@Component({
  selector: 'app-all-mobilecharges',
  templateUrl: './all-mobilecharges.page.html',
  styleUrls: ['./all-mobilecharges.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule]
})
export class AllMobilechargesPage implements OnInit {
  mobilerechargeDatas: any[] = [];
  allMobileRechargeData: any[] = [];
  page = 0;
  limit = 5;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    const history = await this.userService.rechargeHistory(true);
    this.allMobileRechargeData = history.mobileRecharge || [];
    this.loadMoreItems();
  }

  loadMore(event?: any) {
    this.loadMoreItems();

    if (event) {
      event.target.complete();

      if (this.page * this.limit >= this.allMobileRechargeData.length) {
        event.target.disabled = true;
      }
    }
  }

  loadMoreItems() {
    const start = this.page * this.limit;
    const end = start + this.limit;
    const chunk = this.allMobileRechargeData.slice(start, end);
    this.mobilerechargeDatas = this.mobilerechargeDatas.concat(chunk);
    this.page++;
  }
}

