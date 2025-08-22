import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

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
    path: 'onboarding',
    loadComponent: () => import('./pages/onboarding/onboarding.page').then(m => m.OnboardingPage)
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
    loadComponent: () => import('./pages/ordes/ordes.page').then(m => m.OrdesPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then(m => m.FavoritesPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    loadComponent: () => import('./pages/change-password/change-password.page').then(m => m.ChangePasswordPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'personal-info',
    loadComponent: () => import('./pages/personal-info/personal-info.page').then(m => m.PersonalInfoPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'statefilter',
    loadComponent: () => import('./pages/statefilter/statefilter.page').then(m => m.StatefilterPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'cityfilter',
    loadComponent: () => import('./pages/cityfilter/cityfilter.page').then(m => m.CityfilterPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'all-mobilecharges',
    loadComponent: () => import('./pages/all-mobilecharges/all-mobilecharges.page').then(m => m.AllMobilechargesPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'all-electriccharges',
    loadComponent: () => import('./pages/all-electriccharges/all-electriccharges.page').then(m => m.AllElectricchargesPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'mobile-recharge',
    loadComponent: () => import('./pages/mobile-recharge/mobile-recharge.page').then(m => m.MobileRechargePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'plan-list',
    loadComponent: () => import('./pages/plan-list/plan-list.page').then(m => m.PlanListPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'order-summary',
    loadComponent: () => import('./pages/order-summary/order-summary.page').then(m => m.OrderSummaryPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet-recharge-form',
    loadComponent: () => import('./pages/wallet-recharge-form/wallet-recharge-form.page').then(m => m.WalletRechargeFormPage),
    canActivate: [AuthGuard]
  },

  {
    path: 'order-history',
    loadComponent: () => import('./pages/order-history/order-history.page').then(m => m.OrderHistoryPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'coupon-code',
    loadComponent: () => import('./pages/coupon-code/coupon-code.page').then(m => m.CouponCodePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'coupon-order',
    loadComponent: () => import('./pages/coupon-order/coupon-order.page').then(m => m.CouponOrderPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'verification-page',
    loadComponent: () => import('./pages/verification-page/verification-page.page').then(m => m.VerificationPagePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'otp-login',
    loadComponent: () => import('./pages/otp-login/otp-login.page').then(m => m.OtpLoginPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'termcondition',
    loadComponent: () => import('./pages/termcondition/termcondition.page').then(m => m.TermconditionPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'privacypolicy',
    loadComponent: () => import('./pages/privacypolicy/privacypolicy.page').then(m => m.PrivacypolicyPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'transaction-details/:orderId',
    loadComponent: () => import('./pages/transaction-details/transaction-details.page').then(m => m.TransactionDetailsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'coupon-details',
    loadComponent: () => import('./pages/coupon-details/coupon-details.page').then(m => m.CouponDetailsPage),
    canActivate: [AuthGuard]
  },



];
