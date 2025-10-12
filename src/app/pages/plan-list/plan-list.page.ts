import { ModalController } from '@ionic/angular';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { StorageService } from 'src/app/services/storage/storage.service';
import { PubService } from 'src/app/services/pub/pub.service';
import { StatefilterPage } from '../statefilter/statefilter.page';
import { IonContent } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

Swiper.use([Navigation, Pagination]);
@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.page.html',
  styleUrls: ['./plan-list.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PlanListPage implements OnInit {
  @ViewChild('content', { static: false }) content: IonContent | undefined;
  formData: any = {};
  plantypes: any[] = [];
  plans: any[] = [];
  selectedPlanTypeId: string = '';
  showFull: boolean[] = [];
  operators: any[] = [];
  circles: any[] = [];
  selectedPlan: any = {}
  swiper: any;
  plan: any = '';
  amountValue: boolean = false
  constructor(
    private storServ: StorageService,
    private pubServ: PubService,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  async ngOnInit() {
    this.operators = await this.pubServ.getOperators();
    this.circles = await this.pubServ.getCircles();
    this.formData = await this.storServ.getFormData();
    console.log(this.formData);
    this.plantypes = await this.pubServ.planTypes();
    if (this.plantypes.length > 0) {
      this.selectedPlanTypeId = this.plantypes[0].id;
      this.loadPlans(this.selectedPlanTypeId);
    }
  }
  async loadPlans(planTypeId: string) {
    this.plans = await this.pubServ.plansByType(planTypeId, this.formData.operator, this.formData.circle_id);
    this.showFull = this.plans.map(() => false);

  }
  onPlanTypeChange(event: any) {
    const selectedId = event.detail?.value || this.selectedPlanTypeId;
    this.selectedPlanTypeId = selectedId;
    this.loadPlans(selectedId);
  }
  toggleShow(index: number) {
    this.showFull[index] = !this.showFull[index];
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
      this.formData.state_code = data.state.state_code;
    }
  }
  selectPlan(plan: any) {
    this.formData.amount = plan.price;
    this.selectedPlan = plan
    setTimeout(() => {
      this.content?.scrollToTop(300);
    }, 100);
  }
  goToSummary() {
    const formPayload = {
      mobile: this.formData.mobile,
      operator: this.formData.operatorcode,
      operatorId: this.formData.operatorId,
      circle: this.formData.circle,
      circleId: this.formData.circle_id,
      amount: this.formData.amount,
    };

    const dataToSend = {
      ...formPayload,
      plan: this.selectedPlan
    };

    this.router.navigate(['/order-summary'], {
      state: { data: dataToSend }
    });
  }
  selectAndGo(plan: any) {
    this.selectPlan(plan);
    this.goToSummary();
  }

  ngAfterViewInit(): void {
    new Swiper('.mySwiper', {
      loop: false,
      slidesPerView: 3,
      spaceBetween: 8,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
  initSwiper() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
    this.swiper = new Swiper('.mySwiper', {
      loop: false,
      slidesPerView: 3,
      spaceBetween: 8,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
  validateAmount(event: any) {
    const input = event.detail.value || '';
    this.amountValue = true
  }


}
