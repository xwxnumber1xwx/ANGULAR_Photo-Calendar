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
  pictureContainer: any;
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
    this.pictureContainer = $(`#container_${this.imgID}`);
    this.picture.mousedown((event) => {
      console.log('mouse Down', event);
      event.preventDefault();
      this.imagesService.setFocus(this.picture);
      this.borderComponent.showBorder();
    })

    this.dragListeners();

    /*this.picture.dblclick((event) => {
      let transform = this.picture.css('transform');
      this.picture.css('transform', 'rotate(0deg)');
      this.borderComponent.bindBorderPicture();
    })
    */
  }

  //Dragging Listener
  dragListeners(): void {
    //container of image must be draggable and not the image otherwise you have problems width CSS:transform
    // Jquery and transform are not compatible!!!
    this.pictureContainer.draggable();
    this.draggable = true;
    this.pictureContainer.on("dragstart", (event, ui) => {
      console.log('event start', event);
      console.log('ui start', ui);
      this.opacity = 0.7;
    });
    this.pictureContainer.on("drag", (event, ui) => {
      this.borderComponent.bindBorderPicture();
    });
    this.pictureContainer.on("dragstop", (event, ui) => {
      this.opacity = 1;
      this.emitSettings(this.imgPosition, 'position', { top: ui.position.top, left: ui.position.left });
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
    this.pictureContainer.draggable('destroy');
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
    this.emitSettings(this.imgPosition, 'size', { width: widthRz, height: heightRz });

    let posTop = this.image.settings.position.top - (this.startResizePosition.top - event.rectangle.top);
    let posLeft = this.image.settings.position.left - (this.startResizePosition.left - event.rectangle.left);
    this.emitSettings(this.imgPosition, 'position', { top: posTop, left: posLeft });
    if (this.draggable) {
      this.dragListeners();
    };
  }

  // image position
  getStylePicture(): any {
    if (this.image.settings) {
      return {
        'zIndex': this.image.settings.zindex.zindex,
        'width': this.image.settings.size.width,
        'height': this.image.settings.size.height,
        'opacity': this.opacity,
        'transform': this.image.settings.transform.rotation

      }
    }
    return;
  };

  getStyleContainer(): any {
    if (this.image.settings) {
      return {
        'zIndex': this.image.settings.zindex.zindex,
        'left': this.image.settings.position.left + 'px',
        'top': this.image.settings.position.top + 'px',
        'position': this.cssPosition,
        'width': this.image.settings.size.width,
        'height': this.image.settings.size.height,
      }
    }
    return;
  }

}
