import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import { UploadDownloadComponent } from './home/upload-download/upload-download.component';
import { UploadStartComponent } from './home/upload-start/upload-start.component';
import { UploadStep2Component } from './home/upload-step2/upload-step2.component';
import { UploadStep3Component } from './home/upload-step3/upload-step3.component';
import {UploadGuard} from './shared/uploadGuard.service';
import {UploadedGuard} from './shared/uploadedGuard.service';
const routes: Routes = [
  {path: 'upload', component: HomeComponent, children: [
    {path: '', component: UploadStartComponent},
    {path: 'step2', component: UploadStep2Component, canActivate: [UploadGuard]},
    {path: 'step3', component: UploadStep3Component, canActivate: [UploadedGuard]},
    {path: 'download/:uploadURL', component: UploadDownloadComponent},
  ]}, 
  {path: '', redirectTo: '/upload', pathMatch: 'full'},
  {path: 'auth/signIn', component: LoginComponent},
  {path: 'auth/signUp', component: SignUpComponent},
  
  {path: '**', redirectTo: '/upload'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
