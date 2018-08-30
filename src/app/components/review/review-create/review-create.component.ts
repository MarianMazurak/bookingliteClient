import { Component, OnInit, enableProdMode } from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';
import {ReviewService} from '../../../services/review/review.service';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {CreateReview} from '../../../models/create-review';
import {Location} from '@angular/common';
import {Booking} from '../../../models/booking';
import {BookingService} from '../../../services/booking/booking.service';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})
export class ReviewCreateComponent implements OnInit {
  private authenticated;
  review: CreateReview;
  booking: Booking;
  constructor(private auth: AuthService,
              private reviewService: ReviewService,
              private route: ActivatedRoute,
              private bookingService: BookingService,
              private location: Location) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.review = new CreateReview();
  }
  createReview() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('controller review', this.review);
    this.reviewService.createReview(this.review, id).subscribe(res => {
      alert('Review created');
    });
  }
  goBack() {
    this.location.back();
  }
  getBooking() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookingService.getBooking(id).subscribe(b => {this.booking = b; } );
  }
}
