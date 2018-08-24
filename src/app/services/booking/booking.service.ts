import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Booking} from '../../models/booking';
import {BookingCreate} from '../../models/create-booking';



@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingUrl = 'api/bookings'
  private bookingUrl2 = 'api/booking'
  private guestArrivalsUrl = 'api/guestarivals';
  private nowDate: Date;

  constructor(private http: HttpClient) {
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking []>(this.bookingUrl)
      .pipe(tap(res => console.log('catch bookings')
      ));
  }

  getBooking(id: number): Observable<Booking> {
    const url = `${this.bookingUrl2}/${id}`;
    return this.http.get<Booking>(url)
      .pipe(tap(res => console.log('catch ONE booking')
      ));
  }

  cancelBookings(id: number) {
    const url = `${this.bookingUrl2}/${id}`;
    return this.http.put(url,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(tap(res => console.log('cancel booking')
      ));
  }

  isCanceled(bookingStatus: string): boolean {
    const canceledStatus = 'Canceled';
    if (bookingStatus === canceledStatus) {
      return true;
    } else {
      return false;
    }
  }

  isCheckBookingDate(checkIn, checkOut): boolean {
    const dateChackIn = new Date(checkIn)
    const dateChackOut = new Date(checkOut);
    this.nowDate = new Date();
    if (dateChackIn > this.nowDate || dateChackOut > this.nowDate) {
      return true;
    } else {
      return false;
    }
  }
  public createBooking(bookingCreate: BookingCreate, apartmentId: number) {
    const url = `api/booking/${apartmentId}`;
    return this.http.post(url, bookingCreate, {headers: new HttpHeaders({
        'Content-Type': 'application/json' }),
      responseType: 'text'
    });
  }
  getGuestArrivalsList(): Observable<Booking[]> {
    return this.http.get<Booking []>(this.guestArrivalsUrl)
      .pipe(tap(res => console.log('getGuestArrivalsList')
    ));
  }
}
