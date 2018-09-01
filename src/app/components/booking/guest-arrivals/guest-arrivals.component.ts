import {Component, OnInit} from '@angular/core';
import {Booking} from '../../../models/booking';
import {AuthService} from '../../../services/authentication/auth.service';
import {BookingService} from '../../../services/booking/booking.service';

@Component({
  selector: 'app-guest-arrivals',
  templateUrl: './guest-arrivals.component.html',
  styleUrls: ['./guest-arrivals.component.css']
})
export class GuestArrivalsComponent implements OnInit {
  private authenticated;
  guestArrivalsList: Booking [];

  constructor(private auth: AuthService, private bookingService: BookingService) {
  }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getGuestArrivalsList();
  }

  isBookingDateActual(checkIn, checkOut): boolean {
    return this.bookingService.isBookingDateActual(checkIn, checkOut);
  }

  public getGuestArrivalsList() {
    this.bookingService.getGuestArrivalsList().subscribe(bookings => {
      this.guestArrivalsList = bookings,
        console.log('GuestArrivalsComponent list', bookings);
    });
  }

}
