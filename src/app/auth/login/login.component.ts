import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.error.subscribe(error => {
      this.error = error;
    });
  }
  onSubmit(formValue) {
    const login_or_email = formValue.login_or_email;
    const password = formValue.password;
    this.authService.error.next(null);
    this.authService.login(login_or_email, password);
  }
}
