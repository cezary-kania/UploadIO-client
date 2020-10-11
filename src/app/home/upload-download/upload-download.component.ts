import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-download',
  templateUrl: './upload-download.component.html',
  styleUrls: ['./upload-download.component.scss']
})
export class UploadDownloadComponent implements OnInit {
  files : {filename : string}[];
  constructor() { }

  ngOnInit(): void {
    this.files = [
      {filename : "example_filename.pdf"},
      {filename : "my notes.txt"},
      {filename : "profile image.jpg"},
      {filename : "styles.css"},
      
    ];
  }

}
