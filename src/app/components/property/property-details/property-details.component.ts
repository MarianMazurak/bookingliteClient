import { Component, OnInit } from '@angular/core';
import {Property} from '../../../models/property';
import {PropertyService} from '../../../services/property/property.service';
import {ActivatedRoute} from '@angular/router';
import {ReviewService} from '../../../services/review/review.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  public isLoading = false;
  property: Property;
  countReview: number;
  public queryParams = {
    checkin: '',
    checkout: '',
    num_of_guests: ''
  }
  constructor(private route: ActivatedRoute, private propertyService: PropertyService,
              private reviewService: ReviewService) { }

  ngOnInit() {
    this.getPropertyById();
    this.queryParams.checkin = this.route.snapshot.queryParamMap.get('checkin');
    this.queryParams.checkout = this.route.snapshot.queryParamMap.get('checkout');
    this.queryParams.num_of_guests = this.route.snapshot.queryParamMap.get('num_of_guests');
    this.getCountReview();
  }
  public getPropertyById(): Property {
    this.isLoading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getPropertyById(id).subscribe(res => {this.property = res
    this.isLoading = false;
    },
      error => this.isLoading = false);
    return this.property;
  }
  public getCountReview() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.reviewService.getCountReviewByPropertyId(id).subscribe(res => {
      this.countReview = res;
    });
  }
}
