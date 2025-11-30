import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var Splide: any;
declare var $: any; // <-- ADD THIS FOR JQUERY COUNTER

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initGallery1();
        this.initGallery2();
        this.startCounter();  // <-- ADD COUNTER HERE
      }, 300);
    }
  }

  // -----------------------------------------
  // COUNTER FUNCTION
  // -----------------------------------------
  private startCounter(): void {
    if (typeof $ !== 'undefined' && $('.counter').length > 0) {
      $('.counter').countUp({
        time: 1500,
        delay: 20
      });
    }
  }

  // -----------------------------------------
  //  GALLERY SLIDER 1
  // -----------------------------------------
  private initGallery1(): void {
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

  // -----------------------------------------
  // GALLERY SLIDER 2 (RTL)
  // -----------------------------------------
  private initGallery2(): void {
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
