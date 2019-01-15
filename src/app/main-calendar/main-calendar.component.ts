import { Component, OnInit } from '@angular/core';
import {Image} from '../image'

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.sass']
})

export class MainCalendarComponent implements OnInit {

  wholeYear: Date[] = [];
  currentMonth: number = 0;
  yearsList: number[] = [];

  images: any[] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 12; i++) {
      this.images.push(new Image);
    }
    this.createYear();
    this.createYearList(this.yearsList);
  };

  createYearList(years) {
    let y = new Date();
    for (let i = 0; i < 5; i++) {
      years.push(y.getFullYear() + i);
    }
  }

  createYear(year?: number) {
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

  UseThisPicture(url: any, currentMonth: number) {
    this.images[currentMonth].url = url;
  };

  updateSettings(settings, currentMonth) {
    this.images[currentMonth].settings[settings.type] = settings.settings;
    console.log(this.images[currentMonth]);
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
