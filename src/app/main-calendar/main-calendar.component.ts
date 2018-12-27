import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.sass']
})
export class MainCalendarComponent implements OnInit {

  image: any;
  date: Date;
  year: number;
  month: any[] = [];
  monthName: string = '';

  constructor() { }

  ngOnInit() {
    this.date = new Date;
    this.month = this.createCalendarDate();
  }

  createCalendarDate(): any {
    let month: any[] = [];
    this.year = this.date.getFullYear();
    this.monthName = this.getMonthName(this.date.getMonth());
    let daysOfMonth = this.getFullMonth(this.date.getMonth());
    let daysOfLastMonth = this.getFullMonth(this.date.getMonth() - 1);
    this.date.setDate(1);
    let firstDay = this.date.getDay();
    console.log("firstDay " + firstDay);
    let m: number[] = [];
    // +1 mean week start sunday, TODO: +2 for monday but got some error to fix
    for (let i = -firstDay+1; i <= daysOfMonth; i++) {
      if (i<1) {
        month.push(daysOfLastMonth - i - firstDay+1)
      } else
      m.push(i);
    }
    month.reverse();
    month = month.concat(m);
    return month;
  }

  nextMonth(): void {
    this.date.setMonth(this.date.getMonth()+1);
    this.month = this.createCalendarDate();
  }
  lastMonth(): void {
    this.date.setMonth(this.date.getMonth()-1);
    this.month = this.createCalendarDate();
  }

  getFullMonth(m): number {
    if (m < 0) {
      m = 11;
    }
    if ((m === 3) || m === 5 || m === 8 || m === 10) {
      return 30;
    } else if (m === 1) {
      return 28;
    }
    return 31;
  }

  getMonthName(n): string {
    let months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months[n];
  }

  UseThisPicture(url: any) {
    this.image = url;
  }

}
