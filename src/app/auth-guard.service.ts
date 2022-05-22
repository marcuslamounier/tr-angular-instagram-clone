import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Auth } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: Auth){}

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()){
            this.auth.logout()
        }
        return this.auth.isAuthenticated()
    }
}