import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Upload } from 'src/app/shared/upload.model';

import {AdminService} from '../admin.service';

@Component({
  selector: 'app-admin-uploads-list',
  templateUrl: './admin-uploads-list.component.html',
  styleUrls: ['./admin-uploads-list.component.scss']
})
export class AdminUploadsListComponent implements OnInit, OnDestroy {
  uploadsSub : Subscription;
  errorSub : Subscription;
  uploads : Upload[] = [];
  filteredUploads : Upload[] = [];
  error = null;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.fetchUploads();
    this.errorSub = this.adminService.error.subscribe(error => {
      this.error = error;
    });
    this.uploadsSub = this.adminService.uploads.subscribe(users => {
      this.uploads = users;
      this.filteredUploads = users;
    });
  }
  ngOnDestroy() {
    this.errorSub.unsubscribe();
    this.uploadsSub.unsubscribe();
  }
  onFilterUploads(event : any) {
    const pattern = (<HTMLInputElement>event.target).value.toLowerCase();
    this.filteredUploads = this.uploads.filter(upload => {
      let uploadURL = upload.url_hash.toLowerCase();
      return uploadURL.startsWith(pattern);
    });
  }
  onUploadDelete(upload : Upload) {
    this.adminService.deleteUpload(upload.url_hash);
  }
  onDeleteExpiredUploads() {
    this.adminService.deleteExpiredUploads();
  }
  onDeleteAllUploads() {
    this.adminService.deleteAllUploads();
  }
}
