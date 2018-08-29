import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/booking';
import { BookingService } from '../../../services/booking/booking.service';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.css']
})
export class ListBookingComponent implements OnInit {

  bookings: Booking[];
  today: Date;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.getBookings();
    this.today =new Date();
  }

  getBookings(): void {
    this.bookingService.getBookings().subscribe(bookings => {  this.bookings= bookings
    } );
  }

  isCanceled( bookingStatus: string):boolean {
    return  this.bookingService.isCanceled(bookingStatus);
  }

  isCheckBookingDate(checkIn, checkOut):boolean {
    return this.bookingService.isCheckBookingDate(checkIn, checkOut);
  }

  calculateNumberOfDates(checkIn, checkOut): number{
    return this.bookingService.calculateNumberOfDates(checkIn, checkOut);
  }
}