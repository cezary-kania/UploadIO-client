import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class SettingsService {
    private apiUrl: string = environment.apiUrl;
    constructor(private http: HttpClient) {}

    changePassword(oldPassword : string, newPassword: string) {
        return this.http.post<{msg:string}>(`${this.apiUrl}/users/account/change_password`, 
            {
                password : oldPassword,
                new_password : newPassword
            }
        );
    }
    deleteAccount(password: string) {
        return this.http.post<{msg:string}>(`${this.apiUrl}/users/account/delete_account`, 
            {
                password : password
            }
        );
    }
}