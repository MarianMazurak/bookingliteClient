import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';
import {ActivatedRoute} from '@angular/router';
import {ReviewService} from '../../../services/review/review.service';
import {Review} from '../../../models/review';
import {Location} from '@angular/common';

@Component({
  selector: 'app-review-booking',
  templateUrl: './review-booking.component.html',
  styleUrls: ['./review-booking.component.css']
})
export class ReviewBookingComponent implements OnInit {
  private authenticated;
  review: Review;
  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private reviewService: ReviewService,
              private location: Location) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getReviewByBooking();
  }
getReviewByBooking() {
  const id = +this.route.snapshot.paramMap.get('id');
  this.reviewService.getReviewByBooking(id).subscribe(r => this.review = r);
}
  goBack() {
    this.location.back();
  }
}
