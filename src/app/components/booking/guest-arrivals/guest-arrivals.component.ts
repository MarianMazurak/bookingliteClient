import {Component, OnInit} from '@angular/core';
import {Booking} from '../../../models/booking';
import {AuthService} from '../../../services/authentication/auth.service';
import {BookingService} from '../../../services/booking/booking.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-guest-arrivals',
  templateUrl: './guest-arrivals.component.html',
  styleUrls: ['./guest-arrivals.component.css']
})
export class GuestArrivalsComponent implements OnInit {
  private authenticated;
  guestArrivalsList: Booking[];

  constructor(private auth: AuthService,
              private bookingService: BookingService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getGuestArrivalsList();
  }

  public getGuestArrivalsList(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookingService.getGuestArrivalsList(id).subscribe(bookings => {
      this.guestArrivalsList = bookings;
    });
  }

  isCanceled(bookingStatus: string): boolean {
    return this.bookingService.isCanceled(bookingStatus);
  }

  isCheckBookingDate(checkIn, checkOut): boolean {
    return this.bookingService.isCheckBookingDate(checkIn, checkOut);
  }

  calculateNumberOfDates(checkIn, checkOut): number {
    return this.bookingService.calculateNumberOfDates(checkIn, checkOut);
  }
}
