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
  swapHorizontalOutline,
  receiptOutline,
  heartOutline,
  lockClosedOutline,
  callOutline,
  documentTextOutline,
  locateOutline,
  flashOutline,
  ticketOutline,
  cardOutline,
  walletOutline,
  calendarNumberOutline,
  cashOutline,
  calendarOutline,
  documentOutline
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
  'flash-outline': flashOutline,
  'swap-horizontal-outline': swapHorizontalOutline,
  'receipt-outline': receiptOutline,
  'heart-outline': heartOutline,
  'lock-closed-outline': lockClosedOutline,
  'call-outline': callOutline,
  'document-text-outline': documentTextOutline,
  'location-outline': locateOutline,
  'pin': locateOutline,
  'ticket-outline': ticketOutline,
  'card-outline': cardOutline,
  'wallet-outline': walletOutline,
  'calendar-outline': calendarOutline,
  'cash-outline': cashOutline,
  'document-outline': documentOutline

});

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
