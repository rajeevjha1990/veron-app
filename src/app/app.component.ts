import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HeaderComponent } from './components/header/header.component';
import { User } from './data-types/user';
import { UserService } from './services/user/user.service';
import { NavController, MenuController } from '@ionic/angular';
import { MenuComponent } from './components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
import { SHARED_IONIC_MODULES } from './shared/shared.ionic';
import { register } from 'swiper/element/bundle';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, ...SHARED_IONIC_MODULES,
    IonApp,
    IonRouterOutlet,
    HeaderComponent,
    MenuComponent,
    CommonModule,],
})
export class AppComponent {
  user: User = new User();

  constructor(
    private userServ: UserService,
    private navCtrl: NavController,
    private router: Router,
    private menuCtrl: MenuController,
    private platform: Platform
  ) {
    this.userServ.user.subscribe(async u => {
      this.user = u;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.menuCtrl.close('main-menu');
      }
    });
    this.platform.ready().then(() => {
      StatusBar.setOverlaysWebView({ overlay: false });
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#ffffff' });
    });

  }
  async logout() {
    await this.userServ.logout();
    const menuOpen: any = document.getElementsByClassName('menu-content-open')
    setTimeout(() => {
      this.navCtrl.navigateRoot('/');
    }, 1000);
  }

}
