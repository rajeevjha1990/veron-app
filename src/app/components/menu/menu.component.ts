import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    ...SHARED_IONIC_MODULES,

  ]

})
export class MenuComponent implements OnInit {

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private userServ: UserService,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.menuCtrl.close('main-menu');
    });

  }

  ngOnInit() { }
  async logout() {
    await this.userServ.logout();
    const menuOpen: any = document.getElementsByClassName('menu-content-open')
    setTimeout(() => {
      this.navCtrl.navigateRoot('/');
    }, 1000);
  }
  async navigateAndCloseMenu(link: string) {
    await this.menuCtrl.close();
    await this.navCtrl.navigateRoot(link);

  }

}
