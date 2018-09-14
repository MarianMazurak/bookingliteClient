import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReviewService} from '../../../services/review/review.service';
import {Review} from '../../../models/review';

@Component({
  selector: 'app-review-booking',
  templateUrl: './review-booking.component.html',
  styleUrls: ['./review-booking.component.css']
})
export class ReviewBookingComponent implements OnInit {
  review: Review;

  constructor(private route: ActivatedRoute,
              private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.getReviewByBooking();
  }

  getReviewByBooking() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.reviewService.getReviewByBooking(id).subscribe(r => this.review = r);
  }
}
