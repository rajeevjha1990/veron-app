import { Component } from '@angular/core';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [...SHARED_IONIC_MODULES],
})
export class HomePage {
  constructor() { }
}
