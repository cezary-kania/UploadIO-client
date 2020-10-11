import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AuthService} from './Auth.service';
import { HomeComponent } from './home/home.component';
import { UploadStartComponent } from './home/upload-start/upload-start.component';
import { SignUpComponent } from './home/sign-up/sign-up.component';
import { UploadStep2Component } from './home/upload-step2/upload-step2.component';
import { UploadStep3Component } from './home/upload-step3/upload-step3.component'

import {HttpClientModule} from '@angular/common/http';
import { UploadDownloadComponent } from './home/upload-download/upload-download.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UploadStartComponent,
    SignUpComponent,
    UploadStep2Component,
    UploadStep3Component,
    UploadDownloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
