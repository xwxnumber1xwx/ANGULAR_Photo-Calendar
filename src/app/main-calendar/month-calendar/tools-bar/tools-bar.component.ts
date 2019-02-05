import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-tools-bar',
  templateUrl: './tools-bar.component.html',
  styleUrls: ['./tools-bar.component.sass']
})
export class ToolsBarComponent implements OnInit {

  image: any;
  listAllMonthImages: any;

  constructor() { }

  ngOnInit() {
  }

  setImage(image): void {
    this.image = image;
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


  moveForward(): void {
    if (this.image) {
      this.getImages();
      let oldZIndex = this.image.css('zIndex');
      let highestZIndex = this.listAllMonthImages[this.listAllMonthImages.length - 1].style.zIndex;
      if (oldZIndex < highestZIndex) {
        let nextElement = this.getElementwith_zIndex(this.listAllMonthImages, +oldZIndex + 1);
        if (nextElement) {
          nextElement.style.zIndex = oldZIndex;
        }
        oldZIndex++;
        this.image.css('zIndex', oldZIndex);
      }
    }
  }

  moveBehind(): void {
    if (this.image) {
      this.getImages();
      let oldZIndex = this.image.css('zIndex');
      let lowestZIndex = this.listAllMonthImages[0].style.zIndex;
      if (oldZIndex > lowestZIndex) {
        let comeFirstElement = this.getElementwith_zIndex(this.listAllMonthImages, +oldZIndex - 1);
        if (comeFirstElement) {
          comeFirstElement.style.zIndex = oldZIndex;
        }
        oldZIndex--;
        this.image.css('zIndex', oldZIndex);
      }
    }

  }

}
