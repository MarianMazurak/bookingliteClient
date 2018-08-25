import {Component, Input, OnInit} from '@angular/core';
import {Property} from '../../models/property';
import {PropertyService} from '../../services/property/property.service';
import {AuthService} from '../../services/authentication/auth.service';
import {ActivatedRoute} from '@angular/router';
import {ReviewService} from '../../services/review/review.service';
import {Review} from '../../models/review';
import {Observable} from 'rxjs';

@Component ({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  private authenticated;
  reviewsList: Review[];
  @Input() property: Property;

  constructor(private propertyService: PropertyService,
              private auth: AuthService,
              private route: ActivatedRoute,
              private reviewService: ReviewService) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getReviewsByPropertyId();
  }

  public getReviewsByPropertyId() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getPropertyById(id).subscribe(pr => this.property = pr);
    this.reviewService.getAllReviews(id).subscribe(rev => {
      this.reviewsList = rev;
    });
  }

}
