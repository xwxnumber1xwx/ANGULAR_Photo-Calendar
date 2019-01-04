import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery'
import 'jquery-ui/ui/widgets/draggable';
import { ImagesService } from '../../images.service';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.sass']
})
export class MonthCalendarComponent implements OnInit {
  @Input()
  set url(url: any) {
    // TODO, URL has the same data for every component!
    this.pictureSettings.url = url;

  }
  @Input() date: Date = new Date;
  currentMonth: number = 0;
  year: number;
  month: any[] = [];
  monthName: string = '';
  customSettings: boolean = false;
  pictureSettings: any = {
    url: '',
    settings: {
      top: 0,
      left: 0
    }
  }

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {
    this.currentMonth = this.date.getMonth();
    this.month = this.createCalendarDate();
    //this.url = this.imagesService.getImage(this.currentMonth);
    console.log(this.pictureSettings);
      //this.pictureSettings.settings = this.imagesService.getImage(this.currentMonth).settings;
  }

  modifyImage(event) {
    if (this.customSettings === false) {
      const c = $(event.target);
      c.draggable();
      this.customSettings = true;
      c.on("dragstop", (event, ui) => {
        this.pictureSettings.settings.top = ui.position.top;
        this.pictureSettings.settings.left = ui.position.left;
        console.log(this.pictureSettings);
        this.imagesService.setSettings(this.currentMonth, this.pictureSettings);
      });
    }
  }

  getStyle(): any {
    return {
      'position': 'relative',
      'left': this.pictureSettings.settings.left + 'px',
      'top': this.pictureSettings.settings.top + 'px'
    }
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

  /*UseThisPicture(url: any) {
    this.url = url;
  }
  */

}
