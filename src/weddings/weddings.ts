import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var Splide: any;

@Component({
  selector: 'app-weddings',
  imports: [],
  templateUrl: './weddings.html',
  styleUrl: './weddings.css'
})
export class Weddings implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initGallery1();
        this.initGallery2();
      }, 300);
    }
  }

  //  SLIDER 1
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

  //  SLIDER 2 (RTL)
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
