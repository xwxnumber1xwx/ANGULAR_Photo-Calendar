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

  constructor( ) { }

  ngOnInit() {
    this.date = new Date;
    this.year = this.date.getFullYear();
    let m = this.date.getMonth();
    let daysOfMonth = 31;
    if ((m === 3) || m === 5 || m===8 || m ===10) {
      daysOfMonth = 30;
    } else if (m===1) {
      daysOfMonth = 28;
    }
    let day = this.date.getDay();
    for(let i = -day; i <= daysOfMonth; i++) {
        i < 1 ? this.month.push('') : this.month.push(i);
    }
    console.log(this.month);
  }

  UseThisPicture(url: any) {
    this.image = url;
  }

}
