import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-header-popover',
  templateUrl: './header-popover.component.html',
  styleUrls: ['./header-popover.component.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule],

})
export class HeaderPopoverComponent implements OnInit {

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }
  onSelect(action: string) {
    console.log('Selected:', action);
    this.popoverCtrl.dismiss(action);
  }

}
