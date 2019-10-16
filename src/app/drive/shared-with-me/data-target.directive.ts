import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDataTarget]'
})
export class DataTargetDirective implements OnInit {

  @Input() data: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'data-target', this.data);
  }

}
