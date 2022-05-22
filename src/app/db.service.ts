import { Injectable } from '@angular/core'
import { promises, resolve } from 'dns'
import * as firebase from 'firebase'
import { Progress } from './progress.service'

@Injectable()
export class Db {
    constructor(private progress: Progress){}

    public publish(publication: any): void {

        firebase.default.database().ref(`posts/${btoa(publication.email)}`)
        .push({title: publication.title})
        .then((res: any) => {
            let imgName = res.key

            firebase.default.storage().ref().child(`images/${imgName}`)
            .put(publication.img)
            .on(firebase.default.storage.TaskEvent.STATE_CHANGED,
                (snapshot: any) => {
                    this.progress.state = snapshot
                    this.progress.status = 'loading'
                },
                (error) => {this.progress.status = 'error'},
                () => {this.progress.status = 'complete'}
            )
        })
        
    }

    getPosts(emailUser: string): Promise<any> {

        return new Promise((resolve, reject) => {
            
            firebase.default.database().ref(`posts/${btoa(emailUser)}`)
            .orderByKey().once('value')
            .then((snapshot: any) => {
                
                let feedPosts: Array<any> = []

                snapshot.forEach((childSnapshot: any) => {
                    let feedPost = childSnapshot.val()
                    feedPost.key = childSnapshot.key
                    feedPosts.push(feedPost)                  
                })
                return (feedPosts.reverse())
            })
            
            .then((feedPosts: any) => {
                feedPosts.forEach(feedPost => {
                    
                    firebase.default.storage().ref()
                    .child(`images/${feedPost.key}`).getDownloadURL()
                    .then((url: string) => {
                        feedPost.imgUrl = url

                        firebase.default.database()
                        .ref(`user_detail/${btoa(emailUser)}`).once('value')
                        .then((snapshot: any) => {
                            feedPost.username = snapshot.val().username
                        })
                    })
                })

                resolve(feedPosts)
            })
        })
    }

}