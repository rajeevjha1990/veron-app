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
  menuType: string = 'overlay';
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
      this.navCtrl.navigateRoot('/onboarding');
    }, 1000);
  }

  accordionGroupChange(event: any) {
    console.log('Accordion group changed:', event);
    // You can add your logic here, e.g., saving the expanded panel
  }

  async closeMenu() {
    await this.menuCtrl.close('main-menu');
  }

  async navigateAndCloseMenu(link: string) {
    await this.menuCtrl.close('main-menu');
    this.navCtrl.navigateRoot(link);
  }

}
