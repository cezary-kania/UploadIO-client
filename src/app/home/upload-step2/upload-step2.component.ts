import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-step2',
  templateUrl: './upload-step2.component.html',
  styleUrls: ['./upload-step2.component.scss']
})
export class UploadStep2Component implements OnInit {
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
