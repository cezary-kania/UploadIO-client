import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {UserStorageService} from '../userStorage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StorageElement } from '../../storageElement.model';
@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent implements OnInit, OnDestroy {
  idSub : Subscription;
  fileSub : Subscription;
  errorSub : Subscription;
  file : StorageElement;
  error = null;
  constructor(private storageService: UserStorageService,
              private route : ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.idSub = this.route.params.subscribe((params : Params) => {
      const fileId = parseInt(params['id']);
      if(!Number.isNaN(fileId)) {
        this.storageService.getFileById(fileId);
        this.fileSub = this.storageService.file.subscribe(file => {
          this.file = file;
          if(!this.file) this.router.navigate(['/user', 'dashboard']);
        });
        this.errorSub = this.storageService.error.subscribe(error => {
          this.error = error;
        });
      } else {
        this.router.navigate(['/user', 'dashboard']);
      }
    });
    
  }
  onFilenameChange(newFilename : string) {
    this.error = null;
    if(newFilename.length <= 0) {
      this.error = "Filename can't be blank";
      return;
    }
    this.storageService.changefilename(this.file, newFilename);
  }
  onShare(upload_pass) {
    this.storageService.toggleSharing(this.file,'True',upload_pass);
  }
  onDisableShare() {
    this.storageService.toggleSharing(this.file,'False');
  }
  onDelete() {
    this.storageService.deleteFile(this.file);
    this.router.navigate(['/user', 'dashboard']);
  }
  onDownload() {
    this.storageService.downloadFile(this.file);
  }
  ngOnDestroy() {
    this.idSub.unsubscribe();
    this.fileSub.unsubscribe();
    this.errorSub.unsubscribe();
  }
}
