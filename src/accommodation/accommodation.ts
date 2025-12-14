import { Component, ChangeDetectionStrategy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

declare var Splide: any;

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.html',
  styleUrl: './accommodation.css',
  imports: [MatButtonModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Accommodation implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    // Only run in browser (SSR safe)
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initSliders();         // Accommodation sliders
        this.initReviewSliders();   // Review sliders
      }, 300);
    }
  }

  // ----------------------------
  // ACCOMMODATION SLIDERS
  // ----------------------------
  private initSliders(): void {
    const wrappers = document.querySelectorAll('.accomodation-slider');

    wrappers.forEach((wrapper: any) => {
      const mainSlider = wrapper.querySelector('.accomod_main-slider');
      const thumbSlider = wrapper.querySelector('.accomod_thumb-slider');

      if (!mainSlider || !thumbSlider) return;

      const main = new Splide(mainSlider, {
        type: 'loop',
        pagination: false,
        arrows: false,
        cover: true,
        autoplay: true,
        fixedHeight: 550,
        breakpoints: {
          1199: { fixedHeight: 400 },
          600: { fixedHeight: 220 },
        }
      });

      const thumbs = new Splide(thumbSlider, {
        fixedWidth: 190,
        fixedHeight: 130,
        isNavigation: true,
        gap: '10px',
        direction: 'ttb',
        pagination: false,
        arrows: false,
        cover: true,
        type: 'slide',
        perPage: 4,
        perMove: 1,
        height: 550,
        breakpoints: {
          1199: {
            direction: 'ltr',
            perPage: 3,
            fixedWidth: false,
            fixedHeight: 140,
            width: '100%',
          },
          767: {
            perPage: 4,
            fixedHeight: 100,
          },
          600: {
            perPage: 3,
            fixedHeight: 80,
          },
        }
      });

      main.sync(thumbs);
      main.mount();
      thumbs.mount();
    });
  }

  // ----------------------------
  // REVIEW SLIDER
  // ----------------------------
  private initReviewSliders(): void {
    const sliders = document.querySelectorAll('.reviews-slider');

    sliders.forEach((el: any) => {
      new Splide(el, {
        arrows: true,
        pagination: false,
        type: 'loop',
        autoplay: true,
        perPage: 1,
        perMove: 1,
        gap: '10px',
        breakpoints: {
          991: {
            arrows: true
          }
        }
      }).mount();
    });
  }
}
