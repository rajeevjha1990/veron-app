import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then(m => m.SplashPage),
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then(m => m.SignupPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'ordes',
    loadComponent: () => import('./pages/ordes/ordes.page').then(m => m.OrdesPage)
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders.page').then(m => m.OrdersPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then(m => m.FavoritesPage)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./pages/change-password/change-password.page').then(m => m.ChangePasswordPage)
  },
  {
    path: 'personal-info',
    loadComponent: () => import('./pages/personal-info/personal-info.page').then(m => m.PersonalInfoPage)
  },
  {
    path: 'statefilter',
    loadComponent: () => import('./pages/statefilter/statefilter.page').then(m => m.StatefilterPage)
  },
  {
    path: 'cityfilter',
    loadComponent: () => import('./pages/cityfilter/cityfilter.page').then(m => m.CityfilterPage)
  },
  {
    path: 'all-mobilecharges',
    loadComponent: () => import('./pages/all-mobilecharges/all-mobilecharges.page').then(m => m.AllMobilechargesPage)
  },
  {
    path: 'all-electriccharges',
    loadComponent: () => import('./pages/all-electriccharges/all-electriccharges.page').then(m => m.AllElectricchargesPage)
  },
  {
    path: 'mobile-recharge',
    loadComponent: () => import('./pages/mobile-recharge/mobile-recharge.page').then(m => m.MobileRechargePage)
  },
  {
    path: 'plan-list',
    loadComponent: () => import('./pages/plan-list/plan-list.page').then(m => m.PlanListPage)
  },
  {
    path: 'order-summary',
    loadComponent: () => import('./pages/order-summary/order-summary.page').then(m => m.OrderSummaryPage)
  },
  {
    path: 'wallet-recharge-form',
    loadComponent: () => import('./pages/wallet-recharge-form/wallet-recharge-form.page').then(m => m.WalletRechargeFormPage)
  },

  {
    path: 'order-history',
    loadComponent: () => import('./pages/order-history/order-history.page').then(m => m.OrderHistoryPage)
  },
  {
    path: 'coupon-code',
    loadComponent: () => import('./pages/coupon-code/coupon-code.page').then( m => m.CouponCodePage)
  },
  {
    path: 'coupon-order',
    loadComponent: () => import('./pages/coupon-order/coupon-order.page').then( m => m.CouponOrderPage)
  },

];
