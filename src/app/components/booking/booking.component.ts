import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {Booking} from '../../models/booking';
import {BookingService} from '../../services/booking/booking.service';
import {AuthService} from '../../services/authentication/auth.service';
import {ActivatedRoute} from '../../../../node_modules/@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  @Input() booking: Booking;
  private bookingsUrl = '/bookings';

  constructor(private route: ActivatedRoute,
              private bookingService: BookingService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.getBooking();
  }

  getBooking(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookingService.getBooking(id)
      .subscribe(booking => this.booking = booking);
  }

  cancelBooking() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookingService.cancelBookings(id)
      .subscribe(res => this.backToBookings()
      );
  }

  isCheckBookingDate(checkIn, checkOut): boolean {
    return this.bookingService.isCheckBookingDate(checkIn, checkOut);
  }

  isCanceled(bookingStatus: string): boolean {
    return this.bookingService.isCanceled(bookingStatus);
  }

  isReview(idReview) {
    if (!idReview) {
      return true;
    } else {
      return false;
    }
  }

  backToBookings() {
    this.router.navigate([this.bookingsUrl]);
  }

}
