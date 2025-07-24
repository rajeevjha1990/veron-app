import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NavController, ModalController } from '@ionic/angular';
import { User } from 'src/app/data-types/user';
import { LoginPage } from 'src/app/pages/login/login.page';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    ...SHARED_IONIC_MODULES]

})

export class HeaderComponent {
  user: User = new User();
  constructor(
    private userServ: UserService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {
    this.userServ.user.subscribe(async u => {
      this.user = u;
      console.log(this.user);
    });
  }
  async logout() {
    await this.userServ.logout();
    const menuOpen: any = document.getElementsByClassName('menu-content-open')
    setTimeout(() => {
      this.navCtrl.navigateRoot('/');
    }, 1000);
  }
  async goToLogin() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
    });
    return await modal.present();

  }
}

