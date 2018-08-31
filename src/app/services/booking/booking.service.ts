import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Booking} from '../../models/booking';
import {BookingCreate} from '../../models/booking-create';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingsUrl = 'api/bookings';
  private bookingUrl = 'api/booking';

  private nowDate: Date;

  constructor(private http: HttpClient) {
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking []>(this.bookingsUrl);
  }

  getBooking(id: number): Observable<Booking> {
    const url = `${this.bookingUrl}/${id}`;
    return this.http.get<Booking>(url);
  }

  cancelBookings(id: number) {
    const url = `${this.bookingUrl}/${id}`;
    return this.http.put(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(tap(res => console.log('cancel booking')));
  }

  isCanceled(bookingStatus: string): boolean {
    const canceledStatus = 'Canceled';
    if (bookingStatus === canceledStatus) {
      return true;
    } else {
      return false;
    }
  }

  calculateNumberOfDates(checkIn, checkOut): number {
    const dateChackIn = new Date(checkIn);
    const dateChackOut = new Date(checkOut);
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((dateChackOut.getTime() - dateChackIn.getTime()) / (oneDay));
  }

  isCheckBookingDate(checkIn, checkOut): boolean {
    const dateChackIn = new Date(checkIn);
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
    return this.http.post(url, bookingCreate, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    });
  }

  getGuestArrivalsList(id: number): Observable<Booking[]> {
    return this.http.get<Booking []>('api/guestArrivals/' + id);
  }
}
