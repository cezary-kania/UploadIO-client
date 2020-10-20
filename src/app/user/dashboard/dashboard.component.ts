import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageElement } from '../storageElement.model';
import { UserStorage } from '../userStorage.model';
import {UserStorageService} from './userStorage.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  storage : UserStorage = null;
  error = null;
  storageSub : Subscription;
  errorSub : Subscription;
  usedSpace : string = "10GB";
  files = [];
  constructor(private storageService: UserStorageService) { }

  ngOnInit(): void {
    this.storageService.getStorageInfo();
    this.storageSub = this.storageService.storage.subscribe(
      storage => {
        this.error = null;
        this.storage = storage;
        this.usedSpace = this.calcFreeSpace();
        if(storage) {
          const files = [...storage.storage_elements];
          this.files = this.getFileArray(files);
        }
        
      } 
    );
    this.errorSub = this.storageService.error.subscribe(
      error => {this.error = error;}
    )
  }
  onFileUpload(event: any) {
    this.error = null;
    const file = <HTMLInputElement>event.target.files[0];
    this.storageService.uploadFile(file);
  }
  onFileDownload(file) {
    this.error = null;
    this.storageService.downloadFile(file);
  }
  onFileDelete(file) {
    this.error = null;
    this.storageService.deleteFile(file);
  }
  onDeleteFiles() {
    this.error = null;
    this.storageService.clearStorage();
  }
  calcFreeSpace() {
    if(!this.storage) return "0B";
    let usedSpace = this.storage.used_space;
    return this.bytesToString(usedSpace);
  }
  private bytesToString(bytes) {
    if(bytes < 1024) return bytes + "B";
    if(bytes < 1024*1024) return Math.round(bytes / 1024) + "KB";
    if(bytes < 1024*1024*1024) return Math.round(bytes / (1024*1024)) + "MB";
    if(bytes < 1024*1024*1024*1024) return Math.round(bytes / (1024*1024*1024)) + "GB";
  }
  private getFileArray(storageFiles) {

    return storageFiles.map((element=> {
      return {
          filename : element.filename,
          size : this.bytesToString(element.size),
          id : element.id
        }
    }))
  }
  ngOnDestroy() {
    this.errorSub.unsubscribe();
    this.storageSub.unsubscribe();
  }
}
