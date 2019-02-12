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

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.picture = document.getElementById(`${this.imgID}`);
    this.rotationButton = document.getElementById(`rotation_${this.imgID}`);
    this.rotationButton.addEventListener("mousedown", (event) => {
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
    this.moveIt(event, this.prevClientX);
  }

  moveIt(event, prevClientX): void {
    let border = document.getElementById(`border_${this.imgID}`);
    //let alredyRotated = this.picture.style.getPropertyValue("transform")
    if (this.picture) {
      let cx = (event.clientX - prevClientX) / 4;
      this.picture.style.transform = `rotate(${cx}deg)`;
      border.style.transform = `rotate(${cx}deg)`;
    }
  }

}
