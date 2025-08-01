import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { UserService } from 'src/app/services/user/user.service';
import { PopoverController } from '@ionic/angular';
import { User } from 'src/app/data-types/user';

@Component({
  selector: 'app-header-popover',
  templateUrl: './header-popover.component.html',
  styleUrls: ['./header-popover.component.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule],

})
export class HeaderPopoverComponent implements OnInit {
  user: User = new User();

  constructor(
    private popoverCtrl: PopoverController,
    private userServ: UserService
  ) {
    this.userServ.user.subscribe(async u => {
      this.user = u;
      console.log(this.user);
    });
  }

  ngOnInit() { }
  onSelect(action: string) {
    console.log('Selected:', action);
    this.popoverCtrl.dismiss(action);
  }

}
