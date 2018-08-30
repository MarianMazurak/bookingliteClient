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
  private page: number=0;
  private totalElements: number;  
  private sizeElements: number;
  private totalPages: number;
  private pages: Array<number>;

  constructor(private bookingService: BookingService) { }
  
  ngOnInit() {
    // this.getBookings();
    this.today =new Date();
    this.getBookingsByPage();
  }

  getBookings(): void {
    this.bookingService.getBookings().subscribe(bookings => {  this.bookings= bookings
    } );
  }

  getBookingsByPage(): void {
    this.bookingService.getBookingsByPage(this.page).subscribe(data => {  {
      this.bookings= data['content'];
      this.totalElements= data['totalElements'];
      this.sizeElements= data['size'];
      this.totalPages= data['totalPages'];
      this.pages= new Array(data['totalPages']);
    console.log(data);}
    } );
  }

  onPage(n: number): void {
    this.page=n;
    this.getBookingsByPage();
  }

  onPrev(): void {
    this.page --;
    this.getBookingsByPage();
  }

  onNext(next: boolean): void {
    this.page ++;
    this.getBookingsByPage();
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