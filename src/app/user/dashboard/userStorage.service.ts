import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import {environment} from '../../../environments/environment';
import { StorageElement } from '../storageElement.model';
import { UserStorage } from '../userStorage.model';



@Injectable({providedIn: 'root'})
export class UserStorageService {
    private apiUrl: string = environment.apiUrl;
    storage = new BehaviorSubject<UserStorage>(null);
    file = new BehaviorSubject<StorageElement>(null);
    error : Subject<string> = new  Subject<string>();
    
    constructor(private http: HttpClient,
                private router: Router,
                ) {}
    
    getStorageInfo() {
        this.http.get<UserStorage>(`${this.apiUrl}/users/storage/`)
            .subscribe(
                storage => {
                    this.storage.next(storage);
                },
                error => {
                    this.error.next('Something gone wrong.'); 
                }
            );
    }
    clearStorage() {
        this.http.delete(`${this.apiUrl}/users/storage/`)
            .subscribe(
                response => {
                    this.getStorageInfo();
                },
                error => {
                    this.error.next('Something gone wrong.'); 
                }
            );
    }
    uploadFile(file) {
        let formData = new FormData();
        formData.append('file', file);
        this.http.post<UserStorage>(`${this.apiUrl}/users/storage/`, formData)
            .subscribe(
                storage => {
                    this.storage.next(storage);
                },
                error => {
                    this.error.next('Something gone wrong.'); 
                }
            );
    }
    downloadFile(file) {
        this.http.get(`${this.apiUrl}/users/storage/st_element/${file.id}`,
            {
                responseType: 'blob'
            }
        )
        .subscribe(
            response => {
                let anchor = document.createElement("a");
                const url= window.URL.createObjectURL(response);
                anchor.href = url;
                anchor.setAttribute('download', file.filename);
                anchor.click();
            },
            error => {
                let message = 'Something gone wrong.';
                if(error.error.message) message = error.error.message;
                this.error.next(message);
            }
        );
    }
    deleteFile(file) {
        this.http.delete(`${this.apiUrl}/users/storage/st_element/${file.id}`)
            .subscribe(
                response => {
                    this.getStorageInfo();
                },
                error => {
                    let message = 'Something gone wrong.';
                    if(error.error.message) message = error.error.message;
                    this.error.next(message);
                }
            )
    }
    changefilename(file, newFilename) {
        this.editFile(file, {filename : newFilename});
    }
    toggleSharing(file,  shared : string, upload_pass : string ='') {
        this.editFile(file,
            {
                shared : shared,
                upload_pass : upload_pass
            }
        );
    }
    editFile(file, propertyObj) {
        this.http.put<StorageElement>(`${this.apiUrl}/users/storage/st_element/${file.id}`,
            propertyObj)
            .subscribe(
                response => {
                    this.file.next(response);
                    this.getStorageInfo();
                },
                error => {
                    let message = 'Something gone wrong.';
                    if(error.error.message) message = error.error.message;
                    this.error.next(message);
                }
            );
    }
    getFileById(fileId: number) {
        if(!this.storage.getValue()) return null;
        const file = this.storage.getValue()
            .storage_elements.find(file => file.id == fileId);
        if(typeof file === 'undefined') return null;
        this.file.next(file);
    }
}