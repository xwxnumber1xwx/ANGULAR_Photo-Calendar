import { Component, OnInit } from '@angular/core';
import { Image } from '../image'
import { ImagesService } from '../images.service'
import { setupTestingRouter } from '@angular/router/testing';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.sass']
})

export class MainCalendarComponent implements OnInit {

  wholeYear: Date[] = [];
  currentMonth: number = 0;
  yearsList: number[] = [];
  subscription: any;
  subscriptionByID: any;
  deleteImageSubscription: any;


  //images: any[] = [];
  images: Array<any> = new Array(12);

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {
    this.subscription = this.imagesService.getSettings()
      .subscribe(settings => this.updateSettings(settings, this.currentMonth));

      this.subscriptionByID = this.imagesService.getSettingsByID()
      .subscribe(settings => this.updateSettingsByID(settings, this.currentMonth));

    this.deleteImageSubscription = this.imagesService.getImageToDelete()
      .subscribe(id => {
        console.log('image id', id);
        this.deleteImage(id)
      });

    for (let i = 0; i < 12; i++) {
      //this.images.push(new Image);
      this.images[i] = new Array();
      this.images[i][0] = new Image;
    }
    console.log(this.images);
    this.createYear();
    //this.createYearList(this.yearsList);
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionByID.unsubscribe();
  }

  /*createYearList(years) {
    let y = new Date();
    for (let i = 0; i < 5; i++) {
      years.push(y.getFullYear() + i);
    }
  }
  */

  createYear(year?: number): void {
    for (let i = 0; i <= 11; i++) {
      let d = new Date();
      if (year) {
        d.setFullYear(year);
      }
      d.setDate(1);
      d.setMonth(i);
      this.wholeYear.push(d)
    }
  }

  UseThisPicture(url: any, currentMonth: number): void {
    let lastImage = this.images[currentMonth].length - 1
    this.images[currentMonth][lastImage].url = url;
    this.images[currentMonth][lastImage].settings.zindex.zindex = lastImage;
    // set ImageID
    this.images[currentMonth][lastImage].settings['details'] = { month: currentMonth, id: `img_${currentMonth}${lastImage}` }
    this.images[currentMonth].push(new Image);
  };

  updateSettings(settings, currentMonth): void {
      this.images[currentMonth][settings.order].settings[settings.type] = settings.settings;
    //this.images[currentMonth][settings.order].settings['details'] = { month: currentMonth, id: settings.id }
    console.log('updated: ', this.images[currentMonth]);
  }

  updateSettingsByID(settings, currentMonth): void {
    let id = settings.id;
    this.images.forEach((images, index_images) => {
      images.forEach((image, index_image) => {
        if (image.settings.details.id == id) {
          console.log('changing settings by ID: ', this.images[index_images][index_image]);
            this.images[index_images][index_image].settings[settings.type] = settings.settings;
        }
      });
    })
  }

  deleteImage(id): void {
    console.log('id: ', id);
    this.images.forEach((images, index_images) => {
      images.forEach((image, index_image) => {
        if (image.settings.details.id == id) {
          console.log('deleting: ', this.images[index_images][index_image]);
          this.images[index_images].splice(index_image, 1);
        }
      });
    })
    console.log('images', this.images);
  }

  nextMonth(): void {
    if (this.currentMonth != 11)
      this.currentMonth++;
  };

  lastMonth(): void {
    if (this.currentMonth != 0)
      this.currentMonth--;
  };
}
