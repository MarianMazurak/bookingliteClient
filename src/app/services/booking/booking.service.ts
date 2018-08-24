import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Booking} from '../../models/booking';



@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingUrl = 'api/bookings'
  private bookingUrl2 = 'api/booking'
  private nowDate: Date;

  constructor(private http: HttpClient) { }

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
      {headers: new HttpHeaders({
      'Content-Type':  'application/json' })
  })
      .pipe(tap(res => console.log('cancel booking')      
      ));
  }

  isCanceled( bookingStatus: string):boolean {
    const canceledStatus = 'Canceled';
    if(bookingStatus == canceledStatus){
     //console.log('iscancel booking TRUE');  
      return true;
    }
    else{
      //console.log('iscancel booking FALSE');  
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
    //console.log('date', d);
    //console.log('this.today', this.nowDate);
    //console.log('date1', checkIn);
    //console.log('date2', checkOut);
    if(dateChackIn > this.nowDate || dateChackOut > this.nowDate){
      //console.log('isCheckBookingDate', true);
      return true;
    }
    else {
      //console.log('isCheckBookingDate', false);
      return false;
    }
  }
}