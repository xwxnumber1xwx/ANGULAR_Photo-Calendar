import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.sass']
})
export class MonthCalendarComponent implements OnInit {

  @Input() date: Date = new Date;

  @Input() images: any

  @Output()
  imageSettings = new EventEmitter<any>();

  currentMonth: number = 0;
  year: number;
  month: any[] = [];
  monthName: string = '';

  constructor() { }

  ngOnInit() {
    this.currentMonth = this.date.getMonth();
    this.month = this.createCalendarDate();
  }

  ngAfterViewInit(): void {
    // remove border if the user click outside of the picture
    $(document).mousedown((event) => {
      if (!($(event.target).hasClass('calendar-images') || $(event.target).hasClass('border') || $(event.target).hasClass('tools-button') || $(event.target).hasClass('focus-on'))) {
        $('.border').addClass('not-visible');
      }
    })
  }

  createCalendarDate(): any {
    let month: any[] = [];
    this.year = this.date.getFullYear();
    this.monthName = this.getMonthName(this.currentMonth);
    let daysOfMonth = this.getFullMonth(this.currentMonth);
    let daysOfLastMonth = this.getFullMonth(this.currentMonth - 1);
    let firstDay = this.date.getDay();
    console.log("firstDay " + firstDay);
    let m: number[] = [];
    // +1 means week start sunday, TODO: +2 for monday but got some error to fix
    for (let i = -firstDay + 1; i <= daysOfMonth; i++) {
      if (i < 1) {
        month.push(daysOfLastMonth - i - firstDay + 1)
      } else
        m.push(i);
    }
    month.reverse();
    month = month.concat(m);
    return month;
  }

  getFullMonth(m): number {
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (m < 0) return 31;
    return days[m];
  }

  getMonthName(n): string {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[n];
  }

}
