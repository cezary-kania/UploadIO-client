import { Component, OnInit } from '@angular/core';
import {take} from 'rxjs/operators';
import {SettingsService} from '../settings.service';
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  error = null;
  passchanged : boolean = false;
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  }
  onSubmit(formvalue) {
    this.error = null;
    this.passchanged = false;
    const oldPassword = formvalue.password;
    const newPassword = formvalue.new_password;
    this.settingsService.changePassword(oldPassword, newPassword)
    .pipe(take(1))
    .subscribe(
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
}
