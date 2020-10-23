import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import {environment} from '../../environments/environment';
import { User } from '../user/user.model';



@Injectable({providedIn: 'root'})
export class AuthService {
    private apiUrl: string = environment.apiUrl;
    private refTokenExpTimeout : number = null;
    private tokenRefInterval : number = null;
    user = new BehaviorSubject<User>(null);
    error : Subject<string> = new  Subject<string>();
    
    constructor(private http: HttpClient,
                private router: Router) {}
    
    signUp(login : string, password : string, email: string) {
        this.http.post<User>(`${this.apiUrl}/users/auth/register`, 
            {
                Login : login,
                Password : password,
                Email : email
            }
        ).subscribe(
            response => {
                const user = this.getUserFromResp(response);
                this.updateUser(user);
                this.router.navigate(['/user','dashboard']);
            },
            error => {
                let errorMessage = "Unknown error occured";
                if(error.error.message.Login) {
                    errorMessage = error.error.message.Login;
                    this.error.next(errorMessage);
                    return;
                }
                if(error.error.message.Password) {
                    errorMessage = error.error.message.Password;
                    this.error.next(errorMessage);
                    return;
                } 
                if(error.error.message.Email) {
                    errorMessage = error.error.message.Email;
                    this.error.next(errorMessage);
                    return;
                }
                if(error.error.message) {
                    errorMessage = error.error.message;
                    this.error.next(errorMessage);
                    return;
                }
                
                
            }
        );
    }
    login(login_or_email : string, password: string) {
        this.http.post<User>(`${this.apiUrl}/users/auth/login`, 
            {
                login_or_email : login_or_email,
                Password : password,
            }
        ).subscribe(
            response => {
                const user = this.getUserFromResp(response);
                this.updateUser(user);
                this.router.navigate(['/user','dashboard']);
            },
            error => {
                let errorMessage = "Unknown error occured";
                if(error.error.message) {
                    errorMessage = error.error.message;
                    this.error.next(errorMessage);
                    return;
                } 
            }
        );
    }
    logout() {
        this.user.next(null);
        this.router.navigate(['/']);
        localStorage.removeItem('user');
        if(this.refTokenExpTimeout) clearTimeout(this.refTokenExpTimeout);
        this.refTokenExpTimeout = null;
        if(this.tokenRefInterval) clearInterval(this.tokenRefInterval);
        this.tokenRefInterval = null;
    }
    initialLogin() {
        let userData : {
            login : string,
            email: string, 
            account_type : string,
            account_creation_date: string,
            access_token: string,
            refresh_token: string,
            tokenExpiration : Date,
            refreshTokenExpiration : Date
        } = JSON.parse(localStorage.getItem('user'));
        if(!userData) return;
        const user = new User(userData.login,
                        userData.email,
                        userData.account_type,
                        userData.account_creation_date,
                        userData.access_token,
                        userData.refresh_token,
                        new Date(userData.tokenExpiration),
                        new Date(userData.refreshTokenExpiration));
        if(user.refreshTokenExpired) {
            this.logout();
        } else {
            if(user.tokenExpired) this.refreshAuthToken();
            setTimeout(()=> {
                this.refreshAuthToken();
                this.tokenRefInterval = setInterval(()=> {
                    this.refreshAuthToken();
                },User.tokenExpirationTime);
            }, user.timeToTokenExpire);
            this.updateUser(user);
        }
    }
    
    private refreshAuthToken() {
        this.http.post<{access_token : string}>(`${this.apiUrl}/users/auth/get_access_token`, {})
            .subscribe(
                response => {
                    const user = this.user.getValue();
                    user.access_token = response.access_token;
                    user.tokenExpiration = User.GenTokenExpirationDate();
                    this.user.next(user);
                    localStorage.setItem('user', JSON.stringify(user));
                }
            )
    }
    private updateUser(user : User) {
        this.refTokenExpTimeout = setTimeout(()=> {
            this.logout();
        },user.timeToRefTokenExpire);
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user));
    }
    private getUserFromResp(userData) : User {
        return new User(userData.login, 
            userData.email, 
            userData.account_type, 
            userData.account_creation_date,
            userData.access_token,
            userData.refresh_token,
            User.GenTokenExpirationDate(),
            User.GenRefTokenExpirationDate());
    }   
}