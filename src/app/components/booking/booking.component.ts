import { Component, OnInit, Input } from '@angular/core';
import {Booking} from '../../models/booking';
import {BookingService} from '../../services/booking/booking.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Router } from "@angular/router";
import { AuthService } from '../../services/authentication/auth.service';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  @Input() booking: Booking;
  private bookingsUrl = '/bookings/allBookings/1'; 
  private authenticated;

  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router 
) {}

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
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

  isBookingDateActual(checkIn, checkOut):boolean {
    return this.bookingService.isBookingDateActual(checkIn, checkOut)
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
    if( localStorage.getItem('urlToButtonBackToListBookings') ){
      let urlFromLocalStorage: string = localStorage.getItem('urlToButtonBackToListBookings');
      let urlBackToListBooking: string = "/"+ urlFromLocalStorage.split('/')[3] +"/"
                        +urlFromLocalStorage.split('/')[4] +"/"
                        +urlFromLocalStorage.split('/')[5];
      this.router.navigateByUrl( urlBackToListBooking );
    }
    else{
      this.router.navigate([this.bookingsUrl]);
    }    
  }

}
