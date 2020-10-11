import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-start',
  templateUrl: './upload-start.component.html',
  styleUrls: ['./upload-start.component.scss']
})
export class UploadStartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFilesChange(event : any) {
    console.log(<HTMLInputElement>event.target.files);
    
  }

}
