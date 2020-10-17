
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadService } from 'src/app/shared/upload.service';
import { Upload } from '../../shared/upload.model';
@Component({
  selector: 'app-upload-step3',
  templateUrl: './upload-step3.component.html',
  styleUrls: ['./upload-step3.component.scss']
})
export class UploadStep3Component implements OnInit, OnDestroy {
  newUploadSub : Subscription;
  upload : Upload = null;
  daysToExpire : number; 
  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
    this.newUploadSub = this.uploadService.createdAnonymousUpload.subscribe(upload => {
      this.upload = upload;
      if(upload)
        this.daysToExpire = Math.ceil((new Date(upload.expiration_date).getTime() - new Date().getTime()) / (1000*60*60*24));
    });
  }
  ngOnDestroy() {
    this.uploadService.createdAnonymousUpload.next(null);
    this.newUploadSub.unsubscribe();
  }
}
