import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
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
  private borderComponent: BorderComponent;

  picture: any;
  pictureContainer: any;
  mainPhotoContainer: any;

  startResizePosition: any = {
    left: 0,
    top: 0
  };
  cssPosition = 'absolute';
  opacity = 1;

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.picture = $(`#${this.imgID}`);
    if (this.picture) {
      this.mainPhotoContainer = $(`#photo-module_${this.imgID}`).parent();
      console.log('mainPhotoContainer', this.mainPhotoContainer);
    }
    this.pictureContainer = $(`#container_${this.imgID}`);
    this.picture.mousedown((event) => {
      console.log('mouse Down', event);
      event.preventDefault();
      // set focus on this image for borders
      this.imagesService.setFocus(this.picture);
      // show border
      this.borderComponent.showBorder();
    })

    this.dragListeners();
  }

  // Dragging Listener
  dragListeners(): void {
    // container of image must be draggable and not the image otherwise you have problems width CSS:transform
    // Jquery and transform are not compatible!!!
    this.mainPhotoContainer.draggable();
    this.mainPhotoContainer.on('dragstart', (event, ui) => {
      console.log('event start', event);
      console.log('ui start', ui);
      this.opacity = 0.7;
    });
    this.mainPhotoContainer.on('drag', (event, ui) => {
      this.borderComponent.bindBorderPicture();
    });
    this.mainPhotoContainer.on('dragstop', (event, ui) => {
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

  // image position
  getStylePicture(): any {
    if (this.image.settings) {
      return {
        'zIndex': this.image.settings.zindex.zindex,
        'opacity': this.opacity,

      }
    }
    return;
  }
}
