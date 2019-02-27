import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appResize]'
})
export class ResizeDirective {

  @Input() cornerPosition = {
    top: false,
    bottom: false,
    left: false,
    right: false
  }
  @Input() elementIDToResize: string;

  @Output() resizeStart: EventEmitter<any> = new EventEmitter<any>();
  @Output() resizing: EventEmitter<any> = new EventEmitter<any>();
  @Output() resizeEnd: EventEmitter<any> = new EventEmitter<any>();

  id: string;
  ratio: number;
  original_mouse_x: number;
  original_x: number;
  original_width: number;
  original_y: number;
  original_height: number;

  active: boolean = false;

  newWidth: number;
  newHeight: any;
  newTop: number;
  newLeft: number;

  constructor() { }

  @HostListener('mousedown', ['$event']) onmousedown(evt): void {
    evt.preventDefault();
    this.active = true;
    let el: Element = document.getElementById(this.elementIDToResize);
    this.original_width = parseFloat(getComputedStyle(el, null).getPropertyValue('width').replace('px', ''));
    this.original_height = parseFloat(getComputedStyle(el, null).getPropertyValue('height').replace('px', ''));
    this.original_x = parseFloat(getComputedStyle(el.parentElement, null).getPropertyValue('left').replace('px', ''));
    this.original_y = parseFloat(getComputedStyle(el.parentElement, null).getPropertyValue('top').replace('px', ''));
    this.original_mouse_x = evt.pageX;
    this.newLeft = this.original_x;
    this.newTop = this.original_y;
    this.newWidth = this.original_width;
    this.newHeight = this.original_height;
    let position = {
      left: this.newLeft,
      top: this.newTop,
      width: this.newWidth,
      height: this.newHeight
    }
    this.resizeStart.emit(position);
    document.addEventListener('mousemove', this.getElement);
  }

  @HostListener('document:mouseup', ['event']) onmouseup(): void {
    document.removeEventListener('mousemove', this.getElement);
    if (this.active) {
      this.stopResize();
    }
  }

  getElement = (event: MouseEvent): void => {
    this.resize(event, this.elementIDToResize, this.cornerPosition, this.original_mouse_x, this.original_width, this.original_x, this.original_y)
  }

  setRatio(el): void {
    let height = el.getBoundingClientRect().height;
    let width = el.getBoundingClientRect().width;
    this.ratio = width / height;
  }

  resize(event: MouseEvent, id, cornerPosition, original_mouse_x, original_width, original_x, original_y): void {
    if ((cornerPosition.top || cornerPosition.bottom) && (cornerPosition.right || cornerPosition.left)) {
      if (id) {
        let element = document.getElementById(id);
        if (element) {

          // set ratio
          if (!this.ratio) {
            this.setRatio(element);
          }
          if (cornerPosition.bottom && cornerPosition.right) {
            this.newWidth = event.pageX - element.getBoundingClientRect().left;
          } else if (cornerPosition.bottom && cornerPosition.left) {
            this.newWidth = original_width - (event.pageX - original_mouse_x);
            this.newLeft = original_x + (event.pageX - original_mouse_x);
            element.parentElement.style.left = this.newLeft + 'px';
          } else if (cornerPosition.top && cornerPosition.left) {
            this.newWidth = original_width - (event.pageX - original_mouse_x);
            this.newTop = original_y + (event.pageX - original_mouse_x);
            element.parentElement.style.top = this.newTop + 'px';
            this.newLeft = original_x + (event.pageX - original_mouse_x);
            element.parentElement.style.left = this.newLeft + 'px';
          } else if (cornerPosition.top && cornerPosition.right) {
            this.newWidth = original_width + (event.pageX - original_mouse_x);
            this.newTop = original_y - (event.pageX - original_mouse_x);
            element.parentElement.style.top = this.newTop + 'px'
          }
          //this.newHeight = this.newWidth / this.ratio;
          this.newHeight = 'auto';
          element.style.width = this.newWidth + 'px';
          element.style.height = this.newHeight;// + 'px';
          let rot = element.style.transform;
          element.style.transform = 'rotate(0deg)';
          this.newHeight = element.getBoundingClientRect().height;
          element.style.transform = rot;


          let position = {
            left: this.newLeft,
            top: this.newTop,
            width: this.newWidth,
            height: this.newHeight
          }

          this.resizing.emit(position);
        }
      }
    }
  }

  stopResize(): void {
    let position = {
      left: this.newLeft,
      top: this.newTop,
      width: this.newWidth,
      height: this.newHeight
    }
    this.resizeEnd.emit(position);
    this.active = false;
  };




}
