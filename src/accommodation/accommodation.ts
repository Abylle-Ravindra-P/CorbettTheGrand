import { Component, ChangeDetectionStrategy, AfterViewInit, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

declare var Splide: any;

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.html',
  styleUrl: './accommodation.css',
  imports: [MatButtonModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Accommodation implements OnInit, AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    // Listen for fragment changes in the URL
    this.route.fragment.subscribe(fragment => {
      if (fragment && isPlatformBrowser(this.platformId)) {
        // Delay slightly to ensure DOM is ready
        setTimeout(() => {
          this.scrollToFragment(fragment);
        }, 100);
      }
    });
  }

  ngAfterViewInit(): void {
    // Only run in browser (SSR safe)
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initSliders();         // Accommodation sliders
        this.initReviewSliders();   // Review sliders
        
        // Check for fragment on initial load
        this.handleInitialFragment();
      }, 300);
    }
  }

  /**
   * Handle fragment on initial page load
   */
  private handleInitialFragment(): void {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      // Additional delay for initial load to ensure everything is rendered
      setTimeout(() => {
        this.scrollToFragment(fragment);
      }, 500);
    }
  }

  /**
   * Scroll to a specific fragment/anchor
   */
  private scrollToFragment(fragment: string): void {
    try {
      // First try Angular's viewportScroller
      this.viewportScroller.scrollToAnchor(fragment);
      
      // Fallback: Check if element exists and scroll manually
      setTimeout(() => {
        const element = document.getElementById(fragment);
        if (element) {
          // Smooth scroll to the element
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          
          // Add a visual highlight effect (optional)
          this.highlightElement(element);
        } else {
          console.warn(`Element with id "${fragment}" not found`);
        }
      }, 50);
    } catch (error) {
      console.error('Error scrolling to fragment:', error);
    }
  }

  /**
   * Add a temporary highlight effect to the target element
   */
  private highlightElement(element: HTMLElement): void {
    // Save original background color
    const originalBgColor = element.style.backgroundColor;
    const originalTransition = element.style.transition;
    
    // Add highlight effect
    element.style.transition = 'background-color 1s ease';
    element.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    
    // Remove highlight after 1.5 seconds
    setTimeout(() => {
      element.style.backgroundColor = originalBgColor;
      setTimeout(() => {
        element.style.transition = originalTransition;
      }, 1000);
    }, 1500);
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
