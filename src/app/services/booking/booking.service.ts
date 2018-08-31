import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Booking} from '../../models/booking';
import {BookingCreate} from '../../models/booking-create';



@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingsUrl = 'api/bookings';
  private bookingUrl = 'api/booking';
  private bookingByPageUrl = 'api/bookings/pages'
  private guestArrivalsUrl = 'api/guestarivals';

  private nowDate: Date;

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking []>(this.bookingsUrl);
  }

  getBookingsByPage(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<Booking []>(
      `${this.bookingByPageUrl}?getPageNumber=${pageNumber}&getPageSize=${pageSize}`);
  }

  getBooking(id: number): Observable<Booking> {
    const url = `${this.bookingUrl}/${id}`;
    return this.http.get<Booking>(url);
  }

  cancelBookings(id: number) {
    const url = `${this.bookingUrl}/${id}`;
    const httpOption ={
      headers: new HttpHeaders ({
      'Content-Type':  'application/json' })
    };
    return this.http.put(url, httpOption)
  }

  isCanceled( bookingStatus: string):boolean {
    const canceledStatus = 'Canceled';
    if(bookingStatus == canceledStatus){
      return true;
    }
    else{
      return false;
    }
  }

  calculateNumberOfDates(checkIn, checkOut): number{
    let dateChackIn = new Date (checkIn);
    let dateChackOut = new Date (checkOut);
    let oneDay= 24*60*60*1000;
    return Math.round((dateChackOut.getTime() - dateChackIn.getTime()) / (oneDay) );  
  }

  isCheckBookingDate(checkIn, checkOut):boolean {
    let dateChackIn = new Date (checkIn);
    let dateChackOut = new Date (checkOut);
    this.nowDate = new Date();
    if(dateChackIn > this.nowDate || dateChackOut > this.nowDate){
      return true;
    }
    else {
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
