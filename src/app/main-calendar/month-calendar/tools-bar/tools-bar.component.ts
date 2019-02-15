import { Component, OnInit, ElementRef } from '@angular/core';
import * as $ from 'jquery'
import { ImagesService } from '../../../images.service'

@Component({
  selector: 'app-tools-bar',
  templateUrl: './tools-bar.component.html',
  styleUrls: ['./tools-bar.component.sass']
})
export class ToolsBarComponent implements OnInit {

  image: HTMLImageElement;
  listAllMonthImages: any;
  focusSubscription: any;

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {
    this.focusSubscription = this.imagesService.getFocusOn()
      .subscribe(image => this.setImage(image));
  }

  ngOnDestroy() {
    this.focusSubscription.unsubscribe();
  }

  setImage(image): void {
    console.log('setImage()', image);
    if (image instanceof $ ) {
      this.image = image[0];
    } else {
      this.image = image;
    }
  }

  getElementwith_zIndex(images, zIndex): any {
    let image;
    for (let i = 0; i < images.length; i++) {
      let index_current = images[i].style.zIndex;
      if (index_current == zIndex) {
        image = images[i];
      }
    }
    return image;
  }

  getImages(): void {
    this.listAllMonthImages = $('.calendar-images');
    this.listAllMonthImages.sort((a, b) => (a.style.zIndex > b.style.zIndex) ? 1 : ((b.style.zIndex > a.style.zIndex) ? -1 : 0));
  }

  deleteImage(): void {
    if (this.image) {
      this.imagesService.setImageToDelete(this.image.getAttribute('id'));
    }
  }

  sendSettings(element, zIndex) {
    let position = {
      id: element.getAttribute('id'),
      type: 'zindex',
      settings: {
        zindex: parseInt(zIndex)
      }
    }
    console.log('position emitted: ', position);
    this.imagesService.setSettingsByID(position);
  }

  moveForward(): void {
    if (this.image) {
      this.getImages();
      let oldZIndex: number = +this.image.style.zIndex;
      let highestZIndex = this.listAllMonthImages[this.listAllMonthImages.length - 1].style.zIndex;
      if (oldZIndex < highestZIndex) {
        let nextElement = this.getElementwith_zIndex(this.listAllMonthImages, +oldZIndex + 1);
        if (nextElement) {
          this.sendSettings(nextElement, oldZIndex);
        }
        oldZIndex++;
        this.sendSettings(this.image, oldZIndex);
      }
    }
  }

  moveBehind(): void {
    if (this.image) {
      this.getImages();
      let oldZIndex: number = +this.image.style.zIndex;
      let lowestZIndex = this.listAllMonthImages[0].style.zIndex;
      if (oldZIndex > lowestZIndex) {
        let comeFirstElement = this.getElementwith_zIndex(this.listAllMonthImages, +oldZIndex - 1);
        if (comeFirstElement) {
          this.sendSettings(comeFirstElement, oldZIndex);
        }
        oldZIndex--;
        this.sendSettings(this.image, oldZIndex);
      }
    }
  }

}
