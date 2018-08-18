import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Booking} from '../../models/booking';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingUrl = 'api/bookings'

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking []>(this.bookingUrl)
      .pipe(tap(bookings => console.log('catch bookings')
      ));
  }

  getBooking(id: number): Observable<Booking> {
    const url = '${this.bookingUrl}/${id}'
    return this.http.get<Booking>(url);
  }
}
