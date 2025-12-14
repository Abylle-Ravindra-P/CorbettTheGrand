import { Component, ChangeDetectionStrategy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';

declare var Splide: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initTestimonialSlider();
        this.initGallerySlider1();
        this.initGallerySlider2();
      }, 300);
    }
  }

  // --------------------------------
  //  TESTIMONIAL SLIDER
  // --------------------------------
  private initTestimonialSlider(): void {
    const mainSlider = document.querySelector('.testi_main-slider');
    const thumbSlider = document.querySelector('.testi_thumbnail-slider');

    if (!mainSlider || !thumbSlider) return;

    const main = new Splide(mainSlider, {
      type: 'fade',
      pagination: false,
      arrows: false,
      cover: true,
    });

    const thumbs = new Splide(thumbSlider, {
      fixedWidth: 150,
      fixedHeight: 150,
      isNavigation: true,
      gap: 0,
      direction: 'ttb',
      pagination: false,
      arrows: true,
      type: 'loop',
      focus: 'center',
      perPage: 3,
      perMove: 1,
      height: 470,
      breakpoints: {
        1199: {
          fixedWidth: 100,
          fixedHeight: 100,
          height: 330,
        },
        767: {
          direction: 'ltr',
          perPage: 3,
          fixedWidth: 80,
          fixedHeight: 80,
          width: 260,
        },
      }
    });

    main.sync(thumbs);
    main.mount();
    thumbs.mount();
  }

  // --------------------------------
  // GALLERY SLIDER 1
  // --------------------------------
  private initGallerySlider1(): void {
    const el = document.getElementById('Gallerymarqee1');
    if (!el) return;

    new Splide(el, {
      type: 'loop',
      drag: 'free',
      focus: false,
      gap: 20,
      arrows: false,
      pagination: false,
      autoWidth: true,
      autoScroll: {
        speed: 1,
        pauseOnHover: true,
        pauseOnFocus: true,
      },
      breakpoints: {
        1199: { gap: 20 },
        767: { gap: 10 }
      }
    }).mount((window as any).splide.Extensions);
  }

  // --------------------------------
  // GALLERY SLIDER 2 (RTL)
  // --------------------------------
  private initGallerySlider2(): void {
    const el = document.getElementById('Gallerymarqee2');
    if (!el) return;

    new Splide(el, {
      type: 'loop',
      drag: 'free',
      focus: false,
      gap: 20,
      direction: 'rtl',
      arrows: false,
      pagination: false,
      autoWidth: true,
      autoScroll: {
        speed: 1,
        pauseOnHover: true,
        pauseOnFocus: true,
      },
      breakpoints: {
        1199: { gap: 20 },
        767: { gap: 10 }
      }
    }).mount((window as any).splide.Extensions);
  }
}
