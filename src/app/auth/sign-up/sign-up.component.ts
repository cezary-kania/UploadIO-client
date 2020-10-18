import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  error = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.error.subscribe(error => {
      this.error = error;
    });
  }
  onSubmit(formValue) {
    const email = formValue.email;
    const login = formValue.login;
    const password = formValue.password;
    this.authService.error.next(null);
    this.authService.signUp(login, password, email);
  }
}
