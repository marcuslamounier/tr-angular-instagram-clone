import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('timeline') public timeline: any

  constructor(
    private auth: Auth
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.auth.logout()
  }

  public updateTimeline(): void {
    this.timeline.updateTimeline()
  }

}
