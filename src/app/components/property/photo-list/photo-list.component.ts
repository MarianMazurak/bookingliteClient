import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  @Input() urls: string[];
  openedPhotoUrl = '';
  opened = false;
  constructor() { }

  ngOnInit() {
  }
  openPhoto(url: string) {
    this.openedPhotoUrl = url;
    this.opened = true;
  }
  closePhoto() {
    this.opened = false;
  }
}

