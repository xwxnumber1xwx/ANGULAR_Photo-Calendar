import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import { ResizeEvent } from 'angular-resizable-element';
import { ImagesService } from '../../../images.service';
import { BorderComponent } from './border/border.component';

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

    this.dragListeners();
  }

  //Dragging Listener
  dragListeners(): void {
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
      this.emitSettings(this.imgPosition, 'position', {top: ui.position.top, left: ui.position.left});
    }
    );
  }

  // send settings to mainCalendarComponent trough imageService
  emitSettings(imgPosition, type, settings): void {
    let position: object = {
      order: imgPosition,
      type: type,
      settings: settings
    };
    this.imagesService.setSettings(position);
  }

  //resizing Listener
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
    let widthRz = event.rectangle.width + 'px';
    let heightRz = event.rectangle.height + 'px';
    this.emitSettings(this.imgPosition, 'size', {width: widthRz, left: heightRz});

    let posTop = this.image.settings.position.top - (this.startResizePosition.top - event.rectangle.top);
    let posLeft = this.image.settings.position.left - (this.startResizePosition.left - event.rectangle.left);
    this.emitSettings(this.imgPosition, 'position', {top: posTop, left: posLeft});
    if (this.draggable) {
      this.dragListeners();
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
        'zIndex': this.image.settings.zindex.zindex,
        'transform': this.image.settings.transform.rotation
      }
    }
    return;
  };
}
