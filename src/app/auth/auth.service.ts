import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
    private userIdentifier : string = 'cezary.kaniaq@gmail.com'; 
    private isUserLoggedIn : boolean = false;

    constructor(private http: HttpClient) {}
    login() {
        this.isUserLoggedIn = true;
        console.log(environment.apiUrl);
    }
    logout() {this.isUserLoggedIn = false;}

    getUserIndentifier() { return this.userIdentifier;}
    getStatus() {return this.isUserLoggedIn;}
}