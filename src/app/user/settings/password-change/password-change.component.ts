import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {SettingsService} from '../settings.service';
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit, OnDestroy {
  error = null;
  passchanged : boolean = false;
  passChangeSub : Subscription;
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  }
  onSubmit(formvalue) {
    this.error = null;
    this.passchanged = false;
    const oldPassword = formvalue.password;
    const newPassword = formvalue.new_password;
    this.passChangeSub = this.settingsService.changePassword(oldPassword, newPassword).subscribe(
      response => {
        this.passchanged = true;
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
