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
import { DashboardComponent } from './user/dashboard/dashboard.component';
import {SettingsComponent} from './user/settings/settings.component';
import {AccountDeleteComponent} from './user/settings/account-delete/account-delete.component';
import {PasswordChangeComponent} from './user/settings/password-change/password-change.component';
import {UserGuardService} from './auth/userGuard.service';
import {EditFileComponent} from './user/dashboard/edit-file/edit-file.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminUsersListComponent } from './admin-panel/admin-users-list/admin-users-list.component';
import {AdminUploadsListComponent} from './admin-panel/admin-uploads-list/admin-uploads-list.component';
import {AdminGuardService } from './auth/adminGuard.service';

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
  {path: 'user', canActivate: [UserGuardService], children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'dashboard/editfile/:id', component: EditFileComponent},
    {path: 'settings', component: SettingsComponent, children: [
      {path: 'deleteAccount', component: AccountDeleteComponent},
      {path: 'changePassword', component: PasswordChangeComponent},
      {path: '', redirectTo: 'deleteAccount', pathMatch: 'prefix'}
    ]},
  ]},
  {path: 'admin', canActivate: [AdminGuardService], component: AdminPanelComponent, children: [
    {path: '', redirectTo: 'users', pathMatch: 'prefix'},
    {path: 'users', component: AdminUsersListComponent},
    {path: 'uploads', component: AdminUploadsListComponent},
  ]},
  
  {path: '**', redirectTo: '/upload'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
