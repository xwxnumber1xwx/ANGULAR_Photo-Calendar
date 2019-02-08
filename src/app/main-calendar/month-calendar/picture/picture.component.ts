import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import { ResizeEvent } from 'angular-resizable-element';
import { ImagesService } from '../../../images.service'
import { BorderComponent } from './border/border.component'

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.sass']
})
export class PictureComponent implements OnInit {

  @Input() image: any;
  @Input() imgPosition: number;
  @Input() currentMonth: number;
  @Input() imgID: string;

  @ViewChild(BorderComponent)
  private borderComponent: BorderComponent

  picture: any;
  draggable: boolean = false;

  startResizePosition: any = {
    left: 0,
    top: 0
  }
  cssPosition: string = 'absolute';
  opacity: number = 1;

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.picture = $(`#${this.imgID}`);

    this.picture.mousedown((event) => {
      this.imagesService.setFocus(this.picture);
      this.borderComponent.showBorder();
    })

    this.editImg();
  }

  editImg(): void {
    this.picture.draggable();
    this.draggable = true;
    this.picture.on("dragstart", (event, ui) => {
      this.opacity = 0.7;
    });
    this.picture.on("drag", (event, ui) => {
      this.borderComponent.bindBorderPicture();
    });
    this.picture.on("dragstop", (event, ui) => {
      this.opacity = 1;
      let position: object = {
        order: this.imgPosition,
        type: 'position',
        settings: {
          top: ui.position.top,
          left: ui.position.left,
          zindex: this.picture.css('zIndex')
        }
      };
      this.imagesService.setSettings(position);
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
    this.borderComponent.setBorder(event.rectangle.top, event.rectangle.left, event.rectangle.width, event.rectangle.height);
  }

  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    let size: object = {
      order: this.imgPosition,
      type: 'size',
      settings: {
        width: event.rectangle.width + 'px',
        height: event.rectangle.height + 'px'
      }
    }
    this.imagesService.setSettings(size);
    console.log("end top:" + (this.startResizePosition.top - event.rectangle.top));
    console.log("end left:" + (this.startResizePosition.left - event.rectangle.left));
    let position = {
      order: this.imgPosition,
      type: 'position',
      settings: {
        //take out the difference between starting Resize position and ending resize position
        top: this.image.settings.position.top - (this.startResizePosition.top - event.rectangle.top),
        left: this.image.settings.position.left - (this.startResizePosition.left - event.rectangle.left),
        zindex: this.picture.css('zIndex')
      }
    };
    this.imagesService.setSettings(position);
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
