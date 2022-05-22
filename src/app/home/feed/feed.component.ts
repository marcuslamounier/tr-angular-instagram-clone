import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/db.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public email: string
  public feedPosts: any

  constructor(private db: Db) { }

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.updateTimeline()
    })
  }

  public updateTimeline(): void {
    this.db.getPosts(this.email)
    .then((feedPosts: any) => {
      this.feedPosts = feedPosts
    })
  }

}
