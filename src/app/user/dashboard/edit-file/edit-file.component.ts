import { Component, OnInit } from '@angular/core';
import {UserStorageService} from '../userStorage.service';
@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent implements OnInit {

  constructor(private storageService: UserStorageService) { }

  ngOnInit(): void {
  }

}
