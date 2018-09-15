import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Booking} from '../../models/booking';
import {BookingCreate} from '../../models/booking-create';


@Injectable({
  providedIn: 'root'
})
export class BookingService {


  private bookingUrl = 'api/booking';
  private bookingByPageUrl = 'api/bookings';
  private myPropertiesUrl = 'api/myproperties';
  private nowDate: Date;

  constructor(private http: HttpClient) {
  }

  getBookingsByPage(pageNumber: number, pageSize: number, filterBookingsByDates: string): Observable<any> {
    return this.http.get<Booking []>(
      `${this.bookingByPageUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}
      &filterBookingsByDates=${filterBookingsByDates}`);
  }

  getBooking(id: number): Observable<Booking> {
    const url = `${this.bookingUrl}/${id}`;
    return this.http.get<Booking>(url);
  }

  cancelBookings(id: number) {
    const url = `${this.bookingUrl}/${id}`;
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(url, httpOption);

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


  isBookingDateActual(checkIn, checkOut): boolean {
    let dateChackIn = new Date(checkIn);
    let dateChackOut = new Date(checkOut);
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

  getPageGuestArrivalsList(id: number, page: number, size: number, filterBooking: string): Observable<Booking[]> {
    return this.http.get<Booking []>(
      `${this.myPropertiesUrl}/${id}/guestArrivals?page=${page}&size=${size}&filterBooking=${filterBooking}`);
  }
}
