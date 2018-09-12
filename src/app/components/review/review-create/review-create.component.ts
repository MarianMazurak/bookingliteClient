import {Component, OnInit, enableProdMode} from '@angular/core';
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
  review: CreateReview;
  booking: Booking;
  formValid = true;
  errorMessage = '';
  flag: boolean;

  constructor(private reviewService: ReviewService,
              private route: ActivatedRoute,
              private bookingService: BookingService,
              private location: Location) {
  }

  ngOnInit() {
    this.review = new CreateReview();
    this.getBooking();

  }

  createReview(createReviewForm: FormGroup) {
    const id = +this.route.snapshot.paramMap.get('id');
    if (createReviewForm.valid) {
      this.reviewService.createReview(this.review, id).subscribe(res => {
        alert('Review created');
        this.getBooking();
      }, error => {
        this.errorMessage = JSON.parse(error.error).message;
      });
    } else {
      this.formValid = false;
    }
  }

  goBack() {
    this.location.back();
  }

  getBooking() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookingService.getBooking(id).subscribe(b => {
      this.booking = b;
      this.flag = !!b.reviewDto;
    });
  }
}
