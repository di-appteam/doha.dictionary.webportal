import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
@Directive({
  standalone: true,
  selector: '[appJustifyArabic]'
})

export class JustifyArabicDirective implements OnInit {


  isBrowser : boolean = false;
  private $textNode?: HTMLElement ;
  private currentText: string = "";
  constructor(private $el: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.moveTextIntoSpan();
  }
  moveTextIntoSpan() {
    if (this.isBrowser)
    {
    let text = this.$el.nativeElement.innerHTML;
    this.$el.nativeElement.innerHTML = '';

    this.$textNode = document.createElement('span');
    this.$textNode.innerHTML = text;

    this.$textNode.classList.add('justify-content-space-between');
    this.$el.nativeElement.appendChild(this.$textNode);

    this.getCurrentText();
    }
  }

  getCurrentText() {
    if(!this.$textNode)
     return;
    this.currentText = this.$textNode.innerHTML.replace(/\s\s+/g, ' ').trim();
    this.appendNewText();
  }

  appendNewText() {
    let counter = 0;
    var currentStr = "";
    let hasDarkRedClass = this.currentText.indexOf(' class="dark-red') != -1;
    if (hasDarkRedClass) {
      this.currentText = this.currentText.replace(/span class=\"dark-red\"/g, 'i').replace(/<\/span>/g, '</i>');
    }
    if (this.currentText.includes('<br>')) {
      currentStr = this.currentText.split('<br>').map((w, i, arr) => {
        return w.trim().split(' ').map((sw, si, sarr) => {
          return '<span>' + sw + '</span>';
        }).join(' ');
      }).join('<span class=\'break\'></span>').replace('<span><\/span>','');
    }
    else {
      currentStr = this.currentText.trim().split(' ').map((w, i, arr) => {
        return '<span>' + w + '</span>';
      }).join(' ');
    }
    if(!this.$textNode)
     return;
    if (hasDarkRedClass && currentStr.includes('<span><i></span>'))
      this.$textNode.innerHTML = currentStr.replace(/<span><i><\/span>/g, '<span class="dark-red">').replace(/<span><\/i><\/span>/g, '</span>');
    else if (hasDarkRedClass)
      this.$textNode.innerHTML = currentStr.replace(/<i>/g, '<span class="dark-red">').replace(/<\/i>/g, '</span>');
    else
      this.$textNode.innerHTML = currentStr;
  }

}
