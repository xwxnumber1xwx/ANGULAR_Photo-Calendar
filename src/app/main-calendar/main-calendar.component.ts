import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.sass']
})
export class MainCalendarComponent implements OnInit {

  //url: any[] = [];
  url: any = '';
  wholeYear: Date[] = [];
  currentMonth: number = 0;
  yearsList: number[] = [];

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {
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
      if(year) {
        d.setFullYear(year);
      }
      d.setDate(1);
      d.setMonth(i);
      this.wholeYear.push(d)
    }
  }

  UseThisPicture(url: any, currentMonth: number) {
    //this.url[currentMonth] = url;
    this.url = url;
    this.imagesService.setImage(currentMonth, url);
  };

  nextMonth(): void {
    if (this.currentMonth != 11)
      this.currentMonth++;
  };

  lastMonth(): void {
    if (this.currentMonth != 0)
      this.currentMonth--;
  };
}
