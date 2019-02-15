import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-border',
  templateUrl: './border.component.html',
  styleUrls: ['./border.component.sass']
})
export class BorderComponent implements OnInit {

  @Input() imgID: string;
  @Input() imgPosition: number;

  border: any;
  picture: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.picture = document.getElementById(`${this.imgID}`);
    this.border = document.getElementById(`border_${this.imgID}`);

    window.addEventListener('scroll', (event) => {
      this.bindBorderPicture();
    })

    window.addEventListener('resize', (event) => {
      this.bindBorderPicture();
    });
    this.bindBorderPicture();
  }

  showBorder(): void {
    $('.border').addClass('not-visible');
    $(`#border_${this.imgID}`).removeClass('not-visible');
  }

  setBorder(top, left, width, height): void {
    this.border.style.top = top + 'px';
    this.border.style.left = left + 'px';
    this.border.style.width = width + 'px';
    this.border.style.height = height + 'px';
  }

  bindBorderPicture(): void {
    if (this.border && this.picture) {
      // prevent Issue on border Position
      let rot = this.picture.style.transform;
      this.picture.style.transform = 'rotate(0deg)';

      var rectPicture = this.picture.getBoundingClientRect();
      this.border.style.left = `${rectPicture.left}px`;
      this.border.style.top = `${rectPicture.top}px`;
      this.border.style.width = this.picture.offsetWidth + 'px';
      this.border.style.height = this.picture.offsetHeight + 'px';

      // restore rotation
      this.picture.style.transform = rot;
      this.border.style.transform = this.picture.style.transform;
    }
  }

}
