import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UploadService } from 'src/app/shared/upload.service';

import {Upload} from '../../shared/upload.model';
@Component({
  selector: 'app-upload-download',
  templateUrl: './upload-download.component.html',
  styleUrls: ['./upload-download.component.scss']
})
export class UploadDownloadComponent implements OnInit, OnDestroy {
  uploadURL : string;
  error = null;
  upload: Upload;
  downloadPassword: string = ''; 
  uploadSub: Subscription;
  isPassRequired: boolean;
  constructor(private uploadService: UploadService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.uploadURL = params['uploadURL'];
      this.uploadService.checkUploadByUrl(this.uploadURL).subscribe(
        response => {
          this.isPassRequired = response.pass_required;
          if(!this.isPassRequired) this.fetchUpload();
        },
        error => {
          this.handleError(error);
        }
      );
      
    });
  }
  onSubmit(formValue) {
    this.fetchUpload(formValue.upload_pass);
  }
  private fetchUpload(upload_pass='') {
    this.uploadSub = this.uploadService.getUploadByUrl(this.uploadURL, upload_pass).subscribe(
      response => {
          this.isPassRequired = false;
          this.downloadPassword = upload_pass;
          this.upload = new Upload(
                  response.Upload.expiration_date, 
                  response.Upload.has_expired, 
                  response.Upload.password_required,
                  response.Upload.size,
                  response.Upload.uploaded_files,
                  response.Upload.url_hash);
          this.error = null;
      },
      error => {
        this.handleError(error);
      }
    )
  }
  onDownload(number_in_upload) {
    const file = this.upload.uploaded_files.find(
      file => {return file.number_in_upload == number_in_upload});
    let filename = file.filename;
    filename = filename.substring(0, filename.lastIndexOf('.')) || filename;
    this.uploadService.downloadFileFromUpload(this.uploadURL, number_in_upload,this.downloadPassword,filename);
  }
  ngOnDestroy () {
    if(this.uploadSub) this.uploadSub.unsubscribe();
  }
  private handleError(error) {
    let message = 'Unknown error occured!';
    if(error.error.message) message = error.error.message;
    this.error = message;
  }
}
