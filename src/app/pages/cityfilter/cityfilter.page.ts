import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { PubService } from 'src/app/services/pub/pub.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cityfilter',
  templateUrl: './cityfilter.page.html',
  styleUrls: ['./cityfilter.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule]
})
export class CityfilterPage implements OnInit {
  cities: any[] = [];
  filteredCities: any[] = [];
  searchText: string = '';
  selectedCity: any = null;
  @Input() stateId: any;

  constructor(
    private pubServ: PubService,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    console.log('State ID:', this.stateId);
    this.cities = await this.pubServ.getCities(this.stateId);
    this.filteredCities = [...this.cities];
  }
  async filterCities() {
    const query = this.searchText.toLowerCase();
    this.filteredCities = this.cities.filter(city =>
      city.city.toLowerCase().includes(query)
    );
  }
  async selectCity(city: any) {
    this.modalCtrl.dismiss({ city });
  }
}
