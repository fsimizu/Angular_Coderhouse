import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHeaders]'
})
export class HeadersDirective {

  constructor(private elementRef: ElementRef) { 
    this.elementRef.nativeElement.style.fontSize = '20px';
    // this.elementRef.nativeElement.style.backgroundColor = 'yellow';

  }

}
