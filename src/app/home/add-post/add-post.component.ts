import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Db } from 'src/app/db.service';
import * as firebase from 'firebase'
import { Progress } from 'src/app/progress.service';

import { fromEvent, interval, Subject, timer } from 'rxjs';
import { switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators'

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  @Output() public updateTimeline: EventEmitter<any> = new EventEmitter<any>()

  public emailUser: string
  private img: any

  public uploadProgress: string = 'waiting'
  public uploadProgressReason: number = 0

  public formAddPost: FormGroup = new FormGroup({
    'title': new FormControl(null)
  })

  constructor(
    private db: Db,
    private progress: Progress
  ) { }

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged((user) => {
      this.emailUser = user.email
    })
  }

  public publish(): void {

    this.db.publish({
      email: this.emailUser,
      title: this.formAddPost.value.title,
      img: this.img[0]
    })
    
    interval(1000).pipe(
      takeWhile(() => this.uploadProgress !== 'complete')
    )
    .subscribe(
      (res: any) => {
        let totalBytes = this.progress.state.totalBytes

        this.uploadProgress = 'loading'
        this.uploadProgressReason = this.progress.state.bytesTransferred / totalBytes

        if (this.progress.status === 'complete'){
          this.uploadProgress = 'complete'
        }
      },
      (error) => console.log(error),
      () => this.updateTimeline.emit()
    )

  }

  public prepareImageForUpload(event: Event): void {
    this.img = (<HTMLInputElement>event.target).files
  }

}
