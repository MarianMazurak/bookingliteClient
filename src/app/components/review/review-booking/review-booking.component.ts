import {Component, Input, OnInit} from '@angular/core';
import {Booking} from '../../../models/booking';
import {AuthService} from '../../../services/authentication/auth.service';
import {BookingService} from '../../../services/booking/booking.service';
import {ActivatedRoute} from '@angular/router';
import {ReviewService} from '../../../services/review/review.service';
import {Review} from '../../../models/review';

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
              private reviewService: ReviewService) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getReviewByBooking();
  }
getReviewByBooking() {
  const id = +this.route.snapshot.paramMap.get('id');
  this.reviewService.getReviewByBooking(id).subscribe(r => this.review = r);
}
}
