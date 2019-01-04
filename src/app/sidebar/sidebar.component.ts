import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import $ from 'jquery'


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  urls: any[] = [];

  @Output() onSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  readUrl(event: any): void {
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        let reader = new FileReader();


        reader.onload = (event: ProgressEvent) => {
          this.urls.push((<FileReader>event.target).result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  putOnCalendar(url: any): void {
    this.onSelected.emit(url);
  }

  deletePreview(event): void {
    console.log(event.target.parentNode);
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  }
}
