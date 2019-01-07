import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery'
import 'jquery-ui/ui/widgets/draggable';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.sass']
})
export class MonthCalendarComponent implements OnInit {

  @Input() date: Date = new Date;

  @Input() image: any;

  @Output()
  imageSettings = new EventEmitter<any>();

  currentMonth: number = 0;
  year: number;
  month: any[] = [];
  monthName: string = '';
  customSettings: boolean = false;

  constructor() { }

  ngOnInit() {
    this.currentMonth = this.date.getMonth();
    this.month = this.createCalendarDate();
  }

  modifyImage(event) {
    if (this.customSettings === false) {
      const c = $(event.target);
      c.draggable();
      this.customSettings = true;
      c.on("dragstop", (event, ui) => {
        let position = {
          type: 'position',
          settings: {
            top: ui.position.top,
            left: ui.position.left
          }
        };
        this.imageSettings.emit(position);
      });
    }
  }

  getStyle(): any {
    if (this.image.settings) {
      return {
        'position': 'relative',
        'left': this.image.settings.position.left + 'px',
        'top': this.image.settings.position.top + 'px'
      }
    }
    return;
  }

  dragImage(event) {
    if (this.customSettings) {
      const c = $(event.target);
      c.draggable("enable");
    }
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
    // +1 mean week start sunday, TODO: +2 for monday but got some error to fix
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
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[n];
  }

}
