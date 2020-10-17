import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {UploadService} from '../../shared/upload.service';
@Component({
  selector: 'app-upload-start',
  templateUrl: './upload-start.component.html',
  styleUrls: ['./upload-start.component.scss']
})
export class UploadStartComponent implements OnInit {

  constructor(private uploadService: UploadService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onFilesChange(event : any) {
    const files = <HTMLInputElement>event.target.files;
    this.uploadService.setFilesToUpload(files);
    this.router.navigate(['/upload','step2']);
  }

}
