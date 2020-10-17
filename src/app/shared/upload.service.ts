import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import {environment} from '../../environments/environment';
import {Upload} from './upload.model';

@Injectable({providedIn: 'root'})
export class UploadService {
    private apiUrl : string = environment.apiUrl;
    error = new Subject<String>();
    newAnonymousUpFiles = new BehaviorSubject<File[]>(null);
    createdAnonymousUpload = new BehaviorSubject<Upload>(null);
    constructor(private http: HttpClient,
                private router: Router) {}

    setFilesToUpload(files) {
        this.newAnonymousUpFiles.next(files);
    }
    getFilenames() {
        let filenames : string[] = [];
        const files = this.newAnonymousUpFiles.getValue();
        for(let file of files) filenames.push(file.name);
        return filenames;
    }
    anonymous_upload(upload_pass: string, days_to_expire : string) {
        let formData = new FormData();
        const files = this.newAnonymousUpFiles.getValue();
        const fileArray = [...files];
        for(const file of fileArray) formData.append('files[]', file);
        formData.append('upload_pass', upload_pass);
        formData.append('days_to_expire', days_to_expire);

        this.http.post<{Upload : Upload}>(`${this.apiUrl}/uploads/upload`, formData).subscribe(
            response => {
                const upload = new Upload(
                        response.Upload.expiration_date, 
                        response.Upload.has_expired, 
                        response.Upload.password_required,
                        response.Upload.size,
                        response.Upload.uploaded_files,
                        response.Upload.url_hash);
                this.createdAnonymousUpload.next(upload);
                this.router.navigate(['/upload','step3']);
                this.newAnonymousUpFiles.next(null);
            },
            error => {
                let message = 'Unknown error occured!';
                if(error.error.message) message = error.error.message;
                this.error.next(message);
            }
        );
    }

    getUploadByUrl(uploadURL: string, upload_pass = '') {
        return this.http.get<{Upload : Upload}>(`${this.apiUrl}/uploads/upload`, {
            headers: new HttpHeaders({'uploadPass': upload_pass}),
            params : new HttpParams().set('upload_hash', uploadURL)
        });
    }

    checkUploadByUrl(uploadURL: string) {
        return this.http.get<{pass_required : boolean, status: string}>(`${this.apiUrl}/uploads/uploadcheck`, {
            params : new HttpParams().set('upload_hash', uploadURL)
        });
    }
    downloadFileFromUpload(uploadURL: string, file_index: number, upload_pass = '', filename = 'file') {
        let params = new HttpParams();
        params = params.append('upload_hash', uploadURL);
        params = params.append('file_index', file_index.toString());
        this.http.get(`${this.apiUrl}/uploads/uploadedfile`, {
            headers: new HttpHeaders({'uploadPass': upload_pass}),
            params : params,
            responseType: 'blob',
        }).subscribe(
            response => {
                let anchor = document.createElement("a");
                const url= window.URL.createObjectURL(response);
                anchor.href = url;
                anchor.setAttribute('download', filename);
                anchor.click();
            }
        );
    }
}