import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  files : {filename: string, size: string, uploadDate: string}[] = [
    {filename: 'my_resume.pdf', size: '15MB', uploadDate: '2020-07-10'},
    {filename: 'my_resume.pdf', size: '15MB', uploadDate: '2020-07-10'},
    {filename: 'my_resume.pdf', size: '15MB', uploadDate: '2020-07-10'},
    {filename: 'my_resume.pdf', size: '15MB', uploadDate: '2020-07-10'},
  ];
  constructor() { }

  ngOnInit(): void {
  }
  onFileChange(event) {
    console.log(event);
  }
}
