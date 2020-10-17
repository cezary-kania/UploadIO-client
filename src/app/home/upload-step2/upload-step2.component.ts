import { Component, OnDestroy, OnInit } from '@angular/core';

import { UploadService } from 'src/app/shared/upload.service';

import {map} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-step2',
  templateUrl: './upload-step2.component.html',
  styleUrls: ['./upload-step2.component.scss']
})
export class UploadStep2Component implements OnInit, OnDestroy {
  newUploadSub : Subscription;
  errorSub : Subscription;
  filenames : string[];
  error = null;
  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
    this.newUploadSub = this.uploadService.newAnonymousUpFiles.pipe(
        map(files => {
          if(!files) return null;
          let fileArray = [...files];
          return fileArray.map(file => {return file.name; })})
      )
      .subscribe(filenames => {this.filenames = filenames;});
    this.errorSub = this.uploadService.error.subscribe(errorMsg=> {
      this.error = errorMsg;

    })
  }
  onSubmit(formValue) {
    const upload_pass = formValue.upload_pass;
    const days_to_expire = formValue.days_to_expire;
    this.uploadService.anonymous_upload(upload_pass, days_to_expire);
  }
  ngOnDestroy() {
    this.newUploadSub.unsubscribe();
    this.errorSub.unsubscribe();
  }
}
