import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {Booking} from '../../models/booking';
import {BookingService} from '../../services/booking/booking.service';
import {AuthService} from '../../services/authentication/auth.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Router } from "@angular/router";
//import { DateFormatPipe } from '../../helpers/DateFormatPipe'


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
  //template:    'yyyy-MM-dd HH:mm:ss'
})
export class BookingComponent implements OnInit {

  @Input() booking: Booking;
  private bookingUrl = 'api/bookings';

  constructor(private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router 
  //private dateFormatPipe: DateFormatPipe
) {}
  // constructor(private bookingService: BookingService,
  //             private auth: AuthService ) { }
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
      .subscribe(res => {console.log('cancellllll done');
      this.router.navigate(['/bookings']);// in constant!!!!!!!!!!
      });
  }  

  isCheckBookingDate(checkIn, checkOut):boolean {
    //console.log('111111111111111111111', this.bookingService.isCheckBookingDate(checkIn, checkOut));
    return this.bookingService.isCheckBookingDate(checkIn, checkOut)
  }

  isCanceled( bookingStatus: string):boolean {
    return  this.bookingService.isCanceled(bookingStatus);
  }

  isReview(idReview){
    console.log('Hello in isReview');
    if( !idReview ){ //if negative, undefined, null, empty then..
      console.log('in isReview true');
      return true;
    }
    else  {
      console.log('in isReview true');
      return false;
    }
  }

}