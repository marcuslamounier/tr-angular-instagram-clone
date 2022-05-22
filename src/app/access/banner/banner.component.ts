import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { Img } from './img.model'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('hidden', style({
        'opacity': 0
      })),
      state('visible', style({
        'opacity': 1
      })),
      transition('hidden <=> visible', animate('2s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public bannerState: string = 'hidden'

  public images: Img[] = [
    {stateImg: 'visible', urlImg: '/assets/banner-access/img_1.png'},
    {stateImg: 'hidden', urlImg: '/assets/banner-access/img_2.png'},
    {stateImg: 'hidden', urlImg: '/assets/banner-access/img_3.png'},
    {stateImg: 'hidden', urlImg: '/assets/banner-access/img_4.png'},
    {stateImg: 'hidden', urlImg: '/assets/banner-access/img_5.png'}
  ]

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.imgRotation(), 3000)
  }

  public imgRotation(): void {

    let nextImg: number

    for (let i: number = 0; i < this.images.length; i++) {
      if (this.images[i].stateImg === 'visible'){

        this.images[i].stateImg = 'hidden'

        if (i === (this.images.length - 1)) {
          nextImg = 0
        }
        else {
          nextImg = i + 1
        }

        break
      }
    }

    this.images[nextImg].stateImg = 'visible'

    setTimeout(() => this.imgRotation(), 3000)
  }

}
