import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-electricity-bill',
  templateUrl: './electricity-bill.page.html',
  styleUrls: ['./electricity-bill.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ElectricityBillPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
