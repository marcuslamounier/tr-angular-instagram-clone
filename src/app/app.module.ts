import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ROUTES } from './app.routes'
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { Auth } from './auth.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessComponent } from './access/access.component';
import { BannerComponent } from './access/banner/banner.component';
import { LoginComponent } from './access/login/login.component';
import { RegisterComponent } from './access/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './home/feed/feed.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { GoogleService } from './google.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { AddPostComponent } from './home/add-post/add-post.component';
import { Db } from './db.service';
import { Progress } from './progress.service';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    AccessComponent,
    BannerComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FeedComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  providers: [
    Auth,
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'pt-Br' },
    GoogleService,
    HttpClient,
    Db,
    Progress
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
