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

  @Input() image: any

  picture: any;
  resizing: boolean = false;
  draggable: boolean = false;
  startResizePosition: any = {
    left: 0,
    top: 0
  }

  @Output()
  imageSettings = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  editImg(event) {
    this.picture = $(event.target);
    this.picture.draggable();
    this.draggable = true;
    this.picture.on("dragstop", (event, ui) => {
      if (!this.resizing) {
        console.log('changing position');
        let position = {
          type: 'position',
          settings: {
            top: ui.position.top,
            left: ui.position.left
          }
        };
        this.imageSettings.emit(position);
      }
    });
  }

  onResizeStart(event: ResizeEvent): void {
    this.resizing = true;
    // saving the starting resize position
    this.startResizePosition.top = event.rectangle.top;
    this.startResizePosition.left = event.rectangle.left;
  }

  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    let size = {
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
      type: 'position',
      settings: {
        //take out the difference between starting Resize position and ending resize position
        top: this.image.settings.position.top - (this.startResizePosition.top - event.rectangle.top),
        left: this.image.settings.position.left - (this.startResizePosition.left - event.rectangle.left)
      }
    };
    this.imageSettings.emit(position);
    this.resizing = false;
    if (this.draggable) {
      this.picture.draggable('enable');
    };
  }

  // image position
  getStyle(): any {
    if (this.image.settings) {
      return {
        'position': 'relative',
        'left': this.image.settings.position.left + 'px',
        'top': this.image.settings.position.top + 'px',
        'width': this.image.settings.size.width,
        'height': this.image.settings.size.height
      }
    }
    return;
  }

}
