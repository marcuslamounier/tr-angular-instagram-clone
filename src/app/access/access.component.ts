import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleService } from '../google.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
  providers: [ GoogleService ],
  animations: [
    trigger('animation-banner', [
      state('created', style({
        opacity: 1
      })),
      transition('void => created', [
        style({
          opacity: 0,
          transform: 'translate(-100px, 0)'
        }),
        animate('500ms 500ms ease-in-out')
      ])
    ]),
    trigger('animation-login', [
      state('created', style({
        opacity: 1
      })),
      transition('void => created', [
        style({
          opacity: 0,
          transform: 'translate(+50px, 0)'
        }),
        animate('500ms 0s ease-in-out', keyframes([
          style({
            offset: 1,
            opacity: 1,
            transform: 'translateX(0)'
          })
        ]))
      ])
    ]),
    trigger('animation-error-form', [
      state('created', style({})),
      transition('* => created', [
        animate('300ms 0s ease-in-out', keyframes([
          style({ offset: 0.20, transform: 'translateX(-10px'}),
          style({ offset: 0.40, transform: 'translateX(+10px'}),
          style({ offset: 0.60, transform: 'translateX(-10px'}),
          style({ offset: 0.80, transform: 'translateX(+10px'}),
          style({ offset: 1.00, transform: 'translateY(0)'})
        ]))
      ])
    ])
  ]
})
export class AccessComponent implements OnInit {

  @ViewChild(LoginComponent) loginComponent: LoginComponent

  public bannerState: string = 'created'
  public loginState: string = 'created'

  public formState: string

  public registerScreen: boolean = false
  public loginScreen: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  public changeScreen(event: string): void {

    if (event === 'register') {
      this.registerScreen = true
      this.loginScreen = false
    }

    else {
      this.registerScreen = false
      this.loginScreen = true
    }
  }

  public setFormState(event: string): void {
    this.formState = event
  }
  
  public resetFormState(): void {
    this.formState = undefined
  }

}
