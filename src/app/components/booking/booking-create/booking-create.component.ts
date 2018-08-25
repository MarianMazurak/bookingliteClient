import { Component, OnInit } from '@angular/core';
import {Review} from '../../../models/review';
import {AuthService} from '../../../services/authentication/auth.service';
import {ReviewService} from '../../../services/review/review.service';
import {ActivatedRoute} from '@angular/router';
import {Booking} from '../../../models/booking';
import {BookingService} from '../../../services/booking/booking.service';

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.css']
})
export class BookingCreateComponent implements OnInit {
  private authenticated;
  booking: Booking;
  constructor(private auth: AuthService,
              private bookingService: BookingService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
  }
createBooking() {
  const id = +this.route.snapshot.paramMap.get('id');
}
}
