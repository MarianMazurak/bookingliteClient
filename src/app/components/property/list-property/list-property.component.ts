import {Component, OnInit} from '@angular/core';

import {Property} from '../../../models/property';
import {PropertyService} from '../../../services/property/property.service';
import {AuthService} from '../../../services/authentication/auth.service';
import {ReviewService} from '../../../services/review/review.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css']
})
export class ListPropertyComponent implements OnInit {

  private authentication;

  propertyList: Property[];


  reviewCount: number;


  constructor(private propertyService: PropertyService, private reviewService: ReviewService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.authentication = this.auth.isAuthenticated;
      this.getProperties();
  }

  public getProperties() {
    this.propertyService.getProperties().subscribe(properties => {
     this.propertyList = properties;
  });
  }

  public getReviewCount(id: number) {
    return this.reviewService.getReviewCountByPropertyId(id).subscribe(reviewCount => {
      return reviewCount;
    });
  }
}
