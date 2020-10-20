import { HttpClient, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import {environment} from '../../environments/environment';
import { Upload } from '../shared/upload.model';
import { User } from '../user/user.model';

@Injectable({providedIn: 'root'})
export class AdminService {
    private apiUrl: string = environment.apiUrl;

    users = new BehaviorSubject<User[]>(null);
    uploads = new BehaviorSubject<Upload[]>(null);
    error : Subject<string> = new  Subject<string>();
    
    constructor(private http: HttpClient) {}
    
    fetchUsers() {
        this.error.next(null);
        this.http.get<User[]>(`${this.apiUrl}/admin/users`).subscribe(
            response => {
                this.users.next(response);
            },
            error => {
                let message = "Unknown error occured";
                if(error.error.message) message = error.error.message;
                this.error.next(message);
            }
        );
    }
    promoteUser(user : User) {
        this.error.next(null);
        this.changeUserRole(user.login, 'admin');
    }
    degradeUser(user : User) {
        this.error.next(null);
        this.changeUserRole(user.login, 'user');
    }
    changeUserRole(user_login, account_type) {

        this.http.put<User>(`${this.apiUrl}/admin/users/account_type`,
            {
                user_login : user_login, 
                account_type : account_type
            })
        .subscribe(
            response => {
                this.fetchUsers();
            },
            error => {
                let message = "Unknown error occured";
                if(error.error.message) message = error.error.message;
                this.error.next(message);
            }
        );
    }
    deleteUser(user_login) {
        this.error.next(null);
        this.http.delete(`${this.apiUrl}/admin/users`, {
            params : new HttpParams().set('user_login', user_login)
        })
        .subscribe(
            response => {
                this.fetchUsers();
            },
            error => {
                let message = "Unknown error occured";
                if(error.error.message) message = error.error.message;
                this.error.next(message);
            }
        );
    }
    fetchUploads() {
        this.error.next(null);
        this.http.get<Upload[]>(`${this.apiUrl}/admin/uploads`).subscribe(
            response => {
                this.uploads.next(response);
            },
            error => {
                let message = "Unknown error occured";
                if(error.error.message) message = error.error.message;
                this.error.next(message);
            }
        );
    }
    deleteUpload(url_hash) {
        this.error.next(null);
        this.http.delete(`${this.apiUrl}/admin/uploads`, {
            params : new HttpParams().set('upload_hash', url_hash)
        })
        .subscribe(
            response => {
                this.fetchUploads();
            },
            error => {
                let message = "Unknown error occured";
                if(error.error.message) message = error.error.message;
                this.error.next(message);
            }
        );
    }
    deleteAllUploads() {
        this.error.next(null);
        this.http.delete(`${this.apiUrl}/admin/uploads`)
        .subscribe(
            response => {
                this.fetchUploads();
            },
            error => {
                let message = "Unknown error occured";
                if(error.error.message) message = error.error.message;
                this.error.next(message);
            }
        );
    }
    deleteExpiredUploads() {
        this.error.next(null);
        this.http.delete(`${this.apiUrl}/admin/uploads/expired`)
        .subscribe(
            response => {
                this.fetchUploads();
            },
            error => {
                let message = "Unknown error occured";
                if(error.error.message) message = error.error.message;
                this.error.next(message);
            }
        );
    }
}