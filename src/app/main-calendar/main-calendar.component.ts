import { Component, OnInit } from '@angular/core';
import { Image } from '../image'

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.sass']
})

export class MainCalendarComponent implements OnInit {

  wholeYear: Date[] = [];
  currentMonth: number = 0;
  yearsList: number[] = [];

  //images: any[] = [];
  images: Array<any> = new Array(12);

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 12; i++) {
      //this.images.push(new Image);
      this.images[i] = new Array();
      this.images[i][0] = new Image;
    }
    console.log(this.images);
    this.createYear();
    //this.createYearList(this.yearsList);
  };

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
    let lastImage = this.images[currentMonth].length -1
    this.images[currentMonth][lastImage].url = url;
    this.images[currentMonth].push(new Image);
  };

  updateSettings(settings, currentMonth): void {
    this.images[currentMonth][settings.order].settings[settings.type] = settings.settings;
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
