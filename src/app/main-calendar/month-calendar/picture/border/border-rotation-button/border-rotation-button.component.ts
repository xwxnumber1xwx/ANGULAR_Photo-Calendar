import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { ImagesService } from '../../../../../images.service';

@Component({
  selector: 'app-border-rotation-button',
  templateUrl: './border-rotation-button.component.html',
  styleUrls: ['./border-rotation-button.component.sass']
})
export class BorderRotationButtonComponent implements OnInit {

  @Input() imgID: string;
  @Input() imgPosition: number;

  rotationButton: any;
  example: any;
  prevClientX: any;
  picture: any;
  listenerActivated: boolean = false;
  transform: number;

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.picture = document.getElementById(`${this.imgID}`);
    this.rotationButton = document.getElementById(`rotation_${this.imgID}`);
    this.rotationButton.addEventListener("mousedown", (event) => {

      //get rotation
      let tr = document.getElementById(`${this.imgID}`).style.transform;
      //get only value of rotation
      let res = tr.split('rotate(');
      res = res[1].split('deg)');
      this.transform = parseInt(res[0]);

      this.listenerActivated = true;
      event.preventDefault();
      this.prevClientX = event.clientX;
      document.addEventListener('mousemove', this.getClientX);
    })

    document.addEventListener("mouseup", (event) => {
      if (this.listenerActivated) {
        event.preventDefault();
        let position = {
          order: this.imgPosition,
          type: 'transform',
          settings: {
            rotation: this.picture.style.transform
          }
        }
        this.imagesService.setSettings(position)
        document.removeEventListener('mousemove', this.getClientX);
        this.listenerActivated = false;
      }

    })
  }

  getClientX = (event): void => {
    this.moveIt(event, this.prevClientX, this.transform);
  }

  moveIt(event, prevClientX, transform): void {
    let border = document.getElementById(`border_${this.imgID}`);
    console.log('transform value: ', transform);
    if (this.picture) {
      let cx = ((event.clientX - prevClientX) / 4) +  + transform;
      this.picture.style.transform = `rotate(${cx}deg)`;
      border.style.transform = `rotate(${cx}deg)`;
    }
  }

}
