import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import {
  person,
  logOutOutline,
  peopleOutline,
  settingsOutline,
  homeOutline,
  gitNetworkOutline,
  gridOutline,
  gitBranchOutline,
  bookOutline,
  personOutline,
  libraryOutline,
  addOutline,
  playForwardOutline,
  returnDownBack,
  listCircleOutline,
  checkmarkDone,
  closeOutline,
  printOutline,
  phonePortraitOutline,
  flagOutline,
  pricetagOutline,
  swapHorizontalOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

addIcons({
  person,
  'log-out-outline': logOutOutline,
  'people-outline': peopleOutline,
  'settings-outline': settingsOutline,
  'home-outline': homeOutline,
  'git-network-outline': gitNetworkOutline,
  'grid-outline': gridOutline,
  'git-branch-outline': gitBranchOutline,
  'book-outline': bookOutline,
  'person-outline': personOutline,
  'library-outline': libraryOutline,
  'add-outline': addOutline,
  'forward-circle-outline': playForwardOutline,
  'return-down-back-outline': returnDownBack,
  'list-circle-outline': listCircleOutline,
  'checkmark-done-outline': checkmarkDone,
  'close-circle-outline': closeOutline,
  'print-outline': printOutline,
  'phone-portrait-outline': phonePortraitOutline,
  'flash-outline': flagOutline,
  'pricetag-outline': pricetagOutline,
  'swap-horizontal-outline': swapHorizontalOutline
});

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
