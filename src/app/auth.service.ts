import { User } from './access/user.model'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import * as firebase from 'firebase'

@Injectable()
export class Auth {

    public token_id: string
    public errorInAuth: string

    constructor(private router: Router){}

    public addUser(user: User): Promise<any> {

        return firebase.default.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((res: any) => {

                delete user.password
                firebase.default.database()
                    .ref(`user_detail/${btoa(user.email)}`)
                    .set(user)
                this.errorInAuth = undefined
            })
            .catch((error: Error) => {
                this.errorInAuth = error.message
            })
    }

    public authenticate(email: string, password: string): Promise<any> {
        return firebase.default.auth().signInWithEmailAndPassword(email, password)
            .then((response: any) => {
                
                firebase.default.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', idToken)
                        this.router.navigate(['/home'])
                        
                    })

                this.errorInAuth = undefined
            })
            .catch((error: Error) => {
                this.errorInAuth = error.message
            })

    }

    public isAuthenticated(): boolean {

        if (this.token_id === undefined && localStorage.getItem('idToken') != null){
            this.token_id = localStorage.getItem('idToken')
        }
        return (this.token_id !== undefined)
    }

    public logout(): void {
        this.token_id = undefined
        firebase.default.auth().signOut()
            .then(() => {
                this.router.navigate(['/'])
            })
            
        localStorage.clear()
    }

    public goHomeIfIsAuthenticated(): void {
        if (this.isAuthenticated()){
            this.router.navigate(['/home'])
        }
    }
}