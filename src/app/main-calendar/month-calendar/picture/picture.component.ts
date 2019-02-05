import { Component, OnInit, Input, Output, EventEmitter, DoCheck, KeyValueDiffers, KeyValueDiffer, } from '@angular/core';
import * as $ from 'jquery'
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.sass']
})
export class PictureComponent implements OnInit/*, DoCheck */ {

  @Input() image: any;
  @Input() imgID: number;

  /*differ: KeyValueDiffer<string, any>;*/

  picture: any;
  border: any;
  draggable: boolean = false;

  startResizePosition: any = {
    left: 0,
    top: 0
  }
  cssPosition: string = 'absolute';
  opacity: number = 1;
  /*startPosition: object = {
    type: 'position',
    settings: {
      top: 0,
      left: 0
    }
  }
  startSize: object = {
    type: 'size',
    settings: {
      width: 'inherit',
      height: 'inherit'
    }
  }
  */

  @Output()
  imageSettings = new EventEmitter<any>();

  @Output()
  imgFocus = new EventEmitter<any>();

  constructor(/*private differs: KeyValueDiffers*/) {
    //this.differ = this.differs.find({}).create();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.picture = $(`#img_${this.imgID}`);
    //console.log('this.picture', this.picture;
    this.border = document.getElementById(`border_${this.imgID}`);
    this.border.style.width = this.picture.width() + 'px';
    this.border.style.height = this.picture.height() + 'px';
    this.picture.click(() => {
      //console.log('focus on: ', this.picture)
      this.imgFocus.emit(this.picture);
      $('.border').addClass('not-visible');
      $(`#border_${this.imgID}`).removeClass('not-visible');
    })
    this.editImg();
  }

  /*ngDoCheck(): void {
    const changes = this.differ.diff(this.image);
    if (changes) {
      console.log(changes);
      this.imageSettings.emit(this.startPosition);
      this.imageSettings.emit(this.startSize);
    }
  }
  */

  editImg(): void {
    this.picture.draggable();
    this.draggable = true;
    this.picture.on("dragstart", (event, ui) => {
      this.opacity = 0.7;
    });
    this.picture.on("drag", (event, ui) => {
      this.border.style.top = ui.offset.top + 'px';
      this.border.style.left = ui.offset.left + 'px';
    });
    this.picture.on("dragstop", (event, ui) => {
      /*
      console.log("this.border");
      console.log(this.border);
      console.log('changing position');
      console.log(event);
      console.log(ui);
      */
      this.opacity = 1;
      let position: object = {
        id: this.imgID,
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
      id: this.imgID,
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
      id: this.imgID,
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
        'zIndex': this.imgID
      }
    }
    return;
  };

  getBorderStyle(): any {
    return {
      'zIndex': this.imgID
    }
    return;
  }
}
