import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { Storage } from '@ionic/storage-angular';
import { Router, RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';

Swiper.use([Navigation, Autoplay]);

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule, RouterLink]
})
export class OnboardingPage implements OnInit {
  slides = [
    {
      image: 'assets/intro/welcome.jpg',
      title: 'Welcome to Veronmoney',
      subtitle: 'Seamless mobile recharge & bill payments — powered by Veteran Vision Services Pvt. Ltd.'
    },
    {
      image: 'assets/intro/fast-service.jpg',
      title: 'Speed & Convenience',
      subtitle: 'Instant recharges and quick bill payments, saving you time and effort.'
    },
    {
      image: 'assets/intro/security.jpg',
      title: 'Secure Payments',
      subtitle: 'Secure payment gateway protecting your financial information.'
    },
    {
      image: 'assets/intro/coverage.jpg',
      title: 'Wide Coverage',
      subtitle: 'Support for all major mobile operators and billers.'
    },
    {
      image: 'assets/intro/offers.jpg',
      title: 'Exclusive Offers',
      subtitle: 'Enjoy discounts, cashback, and special promotions.'
    },
    {
      image: 'assets/intro/availability.jpg',
      title: '24/7 Availability',
      subtitle: 'Recharge and pay bills anytime, anywhere.'
    },
    {
      image: 'assets/intro/stock.jpg',
      title: 'Notifications & Reminders',
      subtitle: 'Never miss a bill payment with timely reminders.'
    }
  ];
  swiper: any;
  swiperOptions = {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  };

  constructor(
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
  }
  async finishOnboarding() {
    await this.storage.set('onboardingShown', true);

    const token = await this.storage.get('Authkey');
    if (token) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.mySwiper', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 8,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
    });
  }

  initSwiper() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
    this.swiper = new Swiper('.mySwiper', {
      loop: false,
      slidesPerView: 3,
      spaceBetween: 8,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

}
