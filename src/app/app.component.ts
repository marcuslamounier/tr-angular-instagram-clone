import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { Auth } from './auth.service';
import { GoogleService } from './google.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app3';

  constructor(private auth: Auth){}

  ngOnInit(): void {

    var firebaseConfig = {
      apiKey: "AIzaSyCF8s4RuVMnCC_ohtpakEOsXvvAYbHti1M",
      authDomain: "mvlq-instagram.firebaseapp.com",
      databaseURL: "https://mvlq-instagram.firebaseio.com",
      projectId: "mvlq-instagram",
      storageBucket: "mvlq-instagram.appspot.com",
      messagingSenderId: "301531921313",
      appId: "1:301531921313:web:a61bb52318567afc20e9e0"
    }

    firebase.default.initializeApp(firebaseConfig)

    this.auth.goHomeIfIsAuthenticated()
  }

}
