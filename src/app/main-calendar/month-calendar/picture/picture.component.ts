import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery'
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.sass']
})
export class PictureComponent implements OnInit {

  @Input() image: any;
  @Input() imgPosition: number;
  @Input() currentMonth: number;

  picture: any;
  border: any;
  draggable: boolean = false;

  startResizePosition: any = {
    left: 0,
    top: 0
  }
  cssPosition: string = 'absolute';
  opacity: number = 1;

  @Output()
  imageSettings = new EventEmitter<any>();

  @Output()
  imgFocus = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.picture = $(`#img_${this.imgPosition}`);
    //console.log('this.picture', this.picture;
    this.border = document.getElementById(`border_${this.imgPosition}`);
    this.bindBorderPicture();
    this.picture.mousedown((event) => {
      this.imgFocus.emit(this.picture);
      console.log('event: ', event.target);
      console.log('picture: ', this.picture);
      $('.border').addClass('not-visible');
      $(`#border_${this.imgPosition}`).removeClass('not-visible');
    })
    window.addEventListener('scroll', (event) => {
      this.bindBorderPicture();
    })

    window.addEventListener('resize', (event) => {
      this.bindBorderPicture();
    });

    this.editImg();
  }

  bindBorderPicture(): void {
    if (this.border && this.picture) {
      var rectPicture = document.getElementById(`img_${this.imgPosition}`).getBoundingClientRect();
      this.border.style.left = `${rectPicture.left}px`;
      this.border.style.top = `${rectPicture.top}px`;
      this.border.style.width = this.picture.width() + 'px';
      this.border.style.height = this.picture.height() + 'px';
    }
  }

  editImg(): void {
    this.picture.draggable();
    this.draggable = true;
    this.picture.on("dragstart", (event, ui) => {
      this.opacity = 0.7;
    });
    this.picture.on("drag", (event, ui) => {
      this.bindBorderPicture();
    });
    this.picture.on("dragstop", (event, ui) => {
      this.opacity = 1;
      let position: object = {
        id: this.currentMonth.toString() + this.imgPosition,
        order: this.imgPosition,
        type: 'position',
        settings: {
          top: ui.position.top,
          left: ui.position.left
        }
      };
      this.imageSettings.emit(position);
    }
    );
  }

  onResizeStart(event: ResizeEvent): void {
    this.picture.draggable('destroy');
    // saving the starting resize position
    this.startResizePosition.top = event.rectangle.top;
    this.startResizePosition.left = event.rectangle.left;
  }

  onResizing(event: ResizeEvent): void {
    this.border.style.top = event.rectangle.top + 'px';
    this.border.style.left = event.rectangle.left + 'px';
    this.border.style.width = event.rectangle.width + 'px';
    this.border.style.height = event.rectangle.height + 'px';
  }

  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    let size: object = {
      id: this.currentMonth.toString() + this.imgPosition,
      order: this.imgPosition,
      type: 'size',
      settings: {
        width: event.rectangle.width + 'px',
        height: event.rectangle.height + 'px'
      }
    }
    this.imageSettings.emit(size);
    console.log("end top:" + (this.startResizePosition.top - event.rectangle.top));
    console.log("end left:" + (this.startResizePosition.left - event.rectangle.left));
    let position = {
      id: this.currentMonth.toString() + this.imgPosition,
      order: this.imgPosition,
      type: 'position',
      settings: {
        //take out the difference between starting Resize position and ending resize position
        top: this.image.settings.position.top - (this.startResizePosition.top - event.rectangle.top),
        left: this.image.settings.position.left - (this.startResizePosition.left - event.rectangle.left)
      }
    };
    this.imageSettings.emit(position);
    if (this.draggable) {
      this.editImg();
    };
  }

  // image position
  getStyle(): any {
    if (this.image.settings) {
      return {
        'position': this.cssPosition,
        'left': this.image.settings.position.left + 'px',
        'top': this.image.settings.position.top + 'px',
        'width': this.image.settings.size.width,
        'height': this.image.settings.size.height,
        'opacity': this.opacity,
        'zIndex': this.imgPosition
      }
    }
    return;
  };
}
