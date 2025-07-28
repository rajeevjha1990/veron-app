import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { PubService } from 'src/app/services/pub/pub.service';
import { StatefilterPage } from '../statefilter/statefilter.page';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-mobile-recharge',
  templateUrl: './mobile-recharge.page.html',
  styleUrls: ['./mobile-recharge.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ...SHARED_IONIC_MODULES]
})
export class MobileRechargePage implements OnInit {
  operators: any[] = [];
  circles: any[] = [];
  formData: any = {
    mobile: '',
    operator: '',
    circle: '',
    state_id: ''
  };

  constructor(
    private pubServ: PubService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private storServ: StorageService
  ) { }

  async ngOnInit() {
    this.operators = await this.pubServ.getOperators();
    this.circles = await this.pubServ.getCircles();
  }

  async StateList() {
    const modal = await this.modalCtrl.create({
      component: StatefilterPage
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.state) {
      this.formData.circle = data.state.state_name;
      this.formData.state_id = data.state.id;
    }
  }

  async submitSection() {
    this.storServ.setFormData(this.formData);
    this.navCtrl.navigateForward('/plan-list');

  }
}
