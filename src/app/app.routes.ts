import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then(m => m.SplashPage),
  },
  {
    path: '',
    redirectTo: 'splash',  // 👈 change from 'home' to 'splash'
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
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'ordes',
    loadComponent: () => import('./pages/ordes/ordes.page').then( m => m.OrdesPage)
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders.page').then( m => m.OrdersPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then( m => m.FavoritesPage)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./pages/change-password/change-password.page').then( m => m.ChangePasswordPage)
  },
  {
    path: 'personal-info',
    loadComponent: () => import('./pages/personal-info/personal-info.page').then( m => m.PersonalInfoPage)
  },
  {
    path: 'statefilter',
    loadComponent: () => import('./pages/statefilter/statefilter.page').then( m => m.StatefilterPage)
  },
  {
    path: 'cityfilter',
    loadComponent: () => import('./pages/cityfilter/cityfilter.page').then( m => m.CityfilterPage)
  }
];
