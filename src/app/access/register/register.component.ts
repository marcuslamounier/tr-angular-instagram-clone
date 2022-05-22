import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../user.model'

import { Auth } from '../../auth.service'
import { GoogleObj, GoogleService } from 'src/app/google.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @Output() public changeScreen: EventEmitter<string> = new EventEmitter<string>()
  @Output() public setState: EventEmitter<string> = new EventEmitter<string>()

  public formRegister: FormGroup = new FormGroup({
    'email': new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    'fullname': new FormControl(null, [
      Validators.required
    ]),
    'username': new FormControl(null, [
      Validators.required
    ]),
    'password': new FormControl(null, [
      Validators.required
      //Validators.minLength(6)
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

  public showLogin(): void {
    this.changeScreen.emit('login')
  }

  public registerUser(): void {

    let user: User = new User(
      this.formRegister.value.email,
      this.formRegister.value.fullname,
      this.formRegister.value.username,
      this.formRegister.value.password
    )

    this.auth.addUser(user)
    .then(() => {

      this.auth.logout()

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
      else {
        this.showLogin()
      }

    })
  }

}
