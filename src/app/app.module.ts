import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';
import { UploadStartComponent } from './home/upload-start/upload-start.component';
import { UploadStep2Component } from './home/upload-step2/upload-step2.component';
import { UploadStep3Component } from './home/upload-step3/upload-step3.component'

import {HttpClientModule} from '@angular/common/http';
import { UploadDownloadComponent } from './home/upload-download/upload-download.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { SettingsComponent } from './user/settings/settings.component';
import { AccountDeleteComponent } from './user/settings/account-delete/account-delete.component';
import { PasswordChangeComponent } from './user/settings/password-change/password-change.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UploadStartComponent,
    UploadStep2Component,
    UploadStep3Component,
    UploadDownloadComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    SettingsComponent,
    AccountDeleteComponent,
    PasswordChangeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
