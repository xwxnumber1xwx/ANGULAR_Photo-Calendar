import { Component, OnInit, Input } from '@angular/core';
import { ResizeDirective } from '../../../../resize.directive';
import * as $ from 'jquery'
import { from } from 'rxjs';
import { ImagesService } from '../../../../images.service';

@Component({
  selector: 'app-border',
  templateUrl: './border.component.html',
  styleUrls: ['./border.component.sass']
})
export class BorderComponent implements OnInit {

  @Input() image:any;
  @Input() imgID: string;
  @Input() imgPosition: number;

  border: any;
  picture: any;

  startResizePosition: any = {
    left: 0,
    top: 0
  }

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.picture = document.getElementById(`${this.imgID}`);
    this.border = document.getElementById(`border_${this.imgID}`);

    window.addEventListener('scroll', (event) => {
      this.bindBorderPicture();
    })

    window.addEventListener('resize', (event) => {
      this.bindBorderPicture();
    });
    this.bindBorderPicture();
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
  onResizeStart(event): void {
    // saving the starting resize position
    this.startResizePosition.top = event.top;
    this.startResizePosition.left = event.left;
  }

  onResizing(event): void {
    console.log('resizing');
    //this.setBorder(event.top, event.left, event.width, event.height);
    this.bindBorderPicture()
  }

  onResizeEnd(event): void {
    console.log('Element was resized', event);
    let widthRz = event.width + 'px';
    let heightRz = event.height + 'px';
    this.emitSettings(this.imgPosition, 'size', { width: widthRz, height: heightRz });

    let posTop = this.image.settings.position.top - (this.startResizePosition.top - event.top);
    let posLeft = this.image.settings.position.left - (this.startResizePosition.left - event.left);
    this.emitSettings(this.imgPosition, 'position', { top: posTop, left: posLeft });
  }

  showBorder(): void {
    $('.border').addClass('not-visible');
    $(`#border_${this.imgID}`).removeClass('not-visible');
  }

  setBorder(top, left, width, height): void {
    this.border.style.top = top + 'px';
    this.border.style.left = left + 'px';
    this.border.style.width = width + 'px';
    this.border.style.height = height + 'px';
  }

  bindBorderPicture(): void {
    if (this.border && this.picture) {
      // prevent Issue on border Position
      let rot = this.picture.style.transform;
      this.picture.style.transform = 'rotate(0deg)';

      var rectPicture = this.picture.getBoundingClientRect();
      this.border.style.left = `${rectPicture.left}px`;
      this.border.style.top = `${rectPicture.top}px`;
      this.border.style.width = this.picture.offsetWidth + 'px';
      this.border.style.height = this.picture.offsetHeight + 'px';

      // restore rotation
      this.picture.style.transform = rot;
      this.border.style.transform = this.picture.style.transform;
    }
  }

}
