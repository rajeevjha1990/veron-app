import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { Storage } from '@ionic/storage-angular';
import { Router, RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { User } from 'src/app/data-types/user';
import { UserService } from 'src/app/services/user/user.service';

Swiper.use([Navigation, Autoplay]);

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule, RouterLink]
})
export class OnboardingPage implements OnInit {

  slides: any[] = [];     // ✅ API slides
  swiper: any;
  user: User = new User();

  constructor(
    private storage: Storage,
    private router: Router,
    private userServ: UserService,
  ) {
    this.userServ.user.subscribe(u => {
      this.user = u;
    });
  }

  async ngOnInit() {
    await this.loadSlides();
  }

  async loadSlides() {
    try {
      this.slides = await this.userServ.getSlides();
      setTimeout(() => {
        this.initSwiperFromApi();
      }, 100);

    } catch (err) {
      console.error('Slide API Error:', err);
    }
  }
  initSwiperFromApi() {

    if (this.swiper) {
      this.swiper.destroy(true, true);
    }

    this.swiper = new Swiper('.mySwiper', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 8,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      autoplay: {
        delay: 5000,   // normal slides delay
        disableOnInteraction: false,
      }
    });

    // ✅ FIRST SLIDE EXTRA TIME
    this.swiper.autoplay.stop();
    setTimeout(() => {
      this.swiper.autoplay.start();
    }, 10000);   // first slide 10 sec
  }

  async finishOnboarding() {
    if (this.user) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  trackBySlideId(index: number, item: any): any {
    return item?.id ?? index;
  }
}
