import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {SettingsService} from '../settings.service';
@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit, OnDestroy {
  error = null;
  passChangeSub : Subscription;
  
  constructor(private settingsService: SettingsService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  onSubmit(formvalue) {
    this.error = null;
    const oldPassword = formvalue.password;
    this.passChangeSub = this.settingsService.deleteAccount(oldPassword).subscribe(
      response => {
        this.authService.logout();
      },
      error => {
        let errorMessage = "Unknown error occured.";
        if(error.error.message) errorMessage = error.error.message;
        this.error = errorMessage;
      }
    );
  }
  ngOnDestroy() {
    this.passChangeSub.unsubscribe();
  }
}
