import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel-services-section',
  standalone: true,
  imports: [NgFor,NgIf,CarouselModule,NgbCarouselModule,TranslateModule],
  templateUrl: './carousel-services-section.component.html',
  styleUrl: './carousel-services-section.component.scss'
})
export class CarouselServicesSectionComponent {
  public carouselOptions: OwlOptions = {
    items: 1,
    dots: true,
    loop: false,
    rtl: true,
    nav: false,
    rewind:true,
    mouseDrag: true,
    dotsData:false,
    responsive: {
      991: {
        items: 4,
        loop: false,
        mouseDrag: false,
        dots: true,
      }
    }

  };


  constructor(
    private _router: Router) {
  }

  @HostListener('window:resize', ['$event']) windowScroll(e: any) {
    this.checkCarouselState();
  }

  checkCarouselState() {
    this.carouselOptions.loop = false; // this won't refresh the carousel
  }

  redirectTo(componant: string): void {
    if (!componant || componant.length < 1)
      return;
    this._router.navigate([('/' + componant)]);
  }

}
