import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-mobile-recharge',
  templateUrl: './mobile-recharge.page.html',
  styleUrls: ['./mobile-recharge.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MobileRechargePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
