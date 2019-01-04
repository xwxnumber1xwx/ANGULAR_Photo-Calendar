import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  images: any[] = [];
  image: any =  {
    url: '',
    settings: {
      top: 0,
      left: 0
    }
  }

  constructor() { }


  setImage(month: number, url: any, settings?: any): void {
    if (month >= 0 && month < 12) {
      this.image.url = url,
      this.images[month] = this.image;
      if (settings) {
        this.setSettings(month, settings);
      }

    } else {
      Error('month number is not correct')
    }
  }

  getImage(month): any {
    if (month >= 0 && month < 12) {
      return this.images[month];
    } else {
      Error('month number is not correct')
    }
  }

  setSettings(month: number, settings: any): void {
    if (month >= 0 && month < 12) {
      this.image.settings = settings,
      this.images[month] = this.image;
    } else {
      Error('month number is not correct')
    }
  }
}
