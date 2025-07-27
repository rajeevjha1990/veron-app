import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
  mobilerechargeDatas: any = []
  electricityDatas: any = [];
  constructor(
    private userService: UserService,
    private router: NavController
  ) { }

  async ngOnInit() {
    const history = await this.userService.rechargeHistory(true);
    this.mobilerechargeDatas = history.mobileRecharge;
    console.log(this.mobilerechargeDatas);
  }

}
