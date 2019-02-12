import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  imageSettings: EventEmitter<any> = new EventEmitter();
  focusOn: EventEmitter<any> = new EventEmitter();
  imageToDelete: EventEmitter<any> = new EventEmitter();
  imageSettingsByID: EventEmitter<any> = new EventEmitter();

  constructor() { }

  setSettings(settings) {
    this.imageSettings.emit(settings);
  }

  getSettings(): EventEmitter<any> {
    return this.imageSettings;
  }

  setSettingsByID(settings) {
    this.imageSettingsByID.emit(settings);
  }

  getSettingsByID(): EventEmitter<any> {
    return this.imageSettingsByID;
  }

  setFocus(selectedImage): void {
    this.focusOn.emit(selectedImage);
  }

  getFocusOn(): EventEmitter<any> {
    return this.focusOn;
  }

  setImageToDelete(image): void {
    this.imageToDelete.emit(image);
  }

  getImageToDelete(): EventEmitter<any> {
    return this.imageToDelete;
  }

}
