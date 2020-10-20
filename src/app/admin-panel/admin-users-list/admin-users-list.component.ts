import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user/user.model';
import {AdminService} from '../admin.service';
@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.scss']
})
export class AdminUsersListComponent implements OnInit, OnDestroy {
  usersSub : Subscription;
  errorSub : Subscription;
  users : User[] = [];
  filteredUsers : User[] = [];
  error = null;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.fetchUsers();
    this.errorSub = this.adminService.error.subscribe(error => {
      this.error = error;
    });
    this.usersSub = this.adminService.users.subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
  }
  ngOnDestroy() {
    this.errorSub.unsubscribe();
    this.usersSub.unsubscribe();
  }
  onFilterUsers(event : any) {
    const pattern = (<HTMLInputElement>event.target).value.toLowerCase();
    this.filteredUsers = this.users.filter(user => {
      let userLogin = user.login.toLowerCase();
      return userLogin.startsWith(pattern);
    });
  }
  onUserDelete(user : User) {
    this.adminService.deleteUser(user.login);
  }
  onPromoteUser(user : User) {
    
    this.adminService.promoteUser(user);
  }
  onDegradeUser(user) {
    this.adminService.degradeUser(user);
  }
}