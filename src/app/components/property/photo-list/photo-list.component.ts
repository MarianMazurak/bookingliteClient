import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../../../models/photo';
import {ActivatedRoute} from '@angular/router';
import {PropertyService} from '../../../services/property/property.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  /*@Input() urls: string[];*/
  propertyId: number;
  photos: Photo[];
  openedPhotoUrl = '';
  opened = false;
  constructor(private route: ActivatedRoute, private propertyService: PropertyService) { }

  ngOnInit() {
    this.propertyId = Number.parseInt( this.route.snapshot.paramMap.get('id') );
    this.propertyService.getPropertyById(this.propertyId)
                          .subscribe(property => this.photos = property.photos);
  }
  openPhoto(url: string) {
    this.openedPhotoUrl = url;
    this.opened = true;
  }
  closePhoto() {
    this.opened = false;
  }
}

