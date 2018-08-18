import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Booking} from '../../models/booking';
import {BookingService} from '../../services/booking/booking.service';
import {AuthService} from '../../services/authentication/auth.service';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  authenticated;
  bookings: Booking[];

  constructor(private bookingService: BookingService,
              private auth: AuthService ) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getBookings();
  }

  getBookings(): void {
    this.bookingService.getBookings().subscribe(bookings => {  //this.bookings,
      console.log('bbbb', bookings);
    } );
  }

}
