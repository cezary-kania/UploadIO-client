import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged : boolean;
  userIdentifier : string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isLogged = !!user;
      if(!!user) this.userIdentifier = user.email;
    })
  }
  onLogout() {
    this.authService.logout();
  }
}
