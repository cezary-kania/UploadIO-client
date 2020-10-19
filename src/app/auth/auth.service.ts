import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import {environment} from '../../environments/environment';
import { User } from '../user/user.model';



@Injectable({providedIn: 'root'})
export class AuthService {
    private apiUrl: string = environment.apiUrl;
    
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
                const user = new User(response.login, 
                    response.email, 
                    response.account_type, 
                    response.account_creation_date,
                    response.access_token,
                    response.refresh_token,
                    this.GenExpirationDate());
                this.user.next(user);
                localStorage.setItem('user', JSON.stringify(user));
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
                const user = new User(response.login, 
                                      response.email, 
                                      response.account_type, 
                                      response.account_creation_date,
                                      response.access_token,
                                      response.refresh_token,
                                      this.GenExpirationDate());
                this.user.next(user);
                localStorage.setItem('user', JSON.stringify(user));
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
        
    }
    initialLogin() {
        let userData : {
            login : string,
            email: string, 
            account_type : string,
            account_creation_date: string,
            access_token: string,
            refresh_token: string,
            tokenExpiration : Date 
        } = JSON.parse(localStorage.getItem('user'));
        if(!userData) return;
        const user = new User(userData.login,
                        userData.email,
                        userData.account_type,
                        userData.account_creation_date,
                        userData.access_token,
                        userData.refresh_token,
                        new Date(userData.tokenExpiration));
        if(user.tokenExpired) this.router.navigate(['/']);
        else this.user.next(user); 
    }
    private GenExpirationDate() : Date {
        let expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        return expirationDate;
    }
}