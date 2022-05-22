import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleObj, GoogleService } from 'src/app/google.service';

import { Auth } from '../../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ GoogleService ]
})

export class LoginComponent implements OnInit {

  @Output() public changeScreen: EventEmitter<string> = new EventEmitter<string>()
  @Output() public setState: EventEmitter<string> = new EventEmitter<string>()

  public formLogin: FormGroup = new FormGroup({
    'email': new FormControl(null, [
      Validators.email,
      Validators.required
    ]),
    'password': new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  public errorInAuth: any
  
  constructor(
    private auth: Auth,
    private googleService: GoogleService
  ) { }

  ngOnInit(): void {
  }

  public setFormState(): void {
    this.setState.emit('created')
  }

  public showRegister(): void {
    this.changeScreen.emit('register')
  }

  public authenticate(): void {

    this.auth.authenticate(
      this.formLogin.value.email,
      this.formLogin.value.password
    )
    .then(() => {

      if (this.auth.errorInAuth != undefined){

        this.setFormState()

        let googleObj: GoogleObj = new GoogleObj()
        googleObj.q = this.auth.errorInAuth
        
        this.googleService
          .translate(googleObj)
          .subscribe(
            (res: any) => {
              this.errorInAuth = res.data.translations[0].translatedText
            },
            (error: any) => {
              console.log(error)
            }
          )
      }
    })
  }

}
