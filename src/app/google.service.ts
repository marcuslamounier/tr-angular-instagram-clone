import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Injectable()
export class GoogleService {
  constructor(private _http: HttpClient) {}

  translate(obj: GoogleObj) {
    return this._http.post(URL + KEY, obj);
  }
}

const URL: string = 'https://translation.googleapis.com/language/translate/v2?key='
const KEY: string ='AIzaSyCdSM-rAqpAUXy9J0Kpn4NHOL4FXdyLE6E'

export class GoogleObj {
    q: string;
    readonly source: string = 'en';
    readonly target: string = 'pt';
    readonly format: string = 'text';

    constructor() {}
}