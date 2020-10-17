import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';
import { UploadStartComponent } from './home/upload-start/upload-start.component';
import { SignUpHomeComponent } from './home/sign-up/sign-up.component';
import { UploadStep2Component } from './home/upload-step2/upload-step2.component';
import { UploadStep3Component } from './home/upload-step3/upload-step3.component'

import {HttpClientModule} from '@angular/common/http';
import { UploadDownloadComponent } from './home/upload-download/upload-download.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UploadStartComponent,
    SignUpHomeComponent,
    UploadStep2Component,
    UploadStep3Component,
    UploadDownloadComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
