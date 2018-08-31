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
  currentPage = 0;
  lastPage: number;
  allPages : number [];
  intemOnPage = 3; //kil-t6 itemiv na stor
  allItem= 0;  

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
    if(this.currentPage === 0){
      this.bookingService.getBookingsByPage(this.currentPage, this.intemOnPage).subscribe(data => {  {
        this.bookings= data['content'];
        this.allItem= data['totalElements'];
        this.intemOnPage= data['size'];     
        console.log(data);
        this.lastPage=data['totalPages'];
        this.calculatePages(this.currentPage, this.lastPage);
        console.log(this.currentPage);
        console.log(this.allPages);
      }
      } );
    }
    else if( this.currentPage >= 1){
      let curPage= this.currentPage -1;
      this.bookingService.getBookingsByPage(curPage, this.intemOnPage).subscribe(data => {  {
        this.bookings= data['content'];
        this.allItem= data['totalElements'];
        this.intemOnPage= data['size'];     
        console.log(data);
        this.lastPage=data['totalPages'];
        this.calculatePages(this.currentPage, this.lastPage);
        console.log(this.currentPage);
        console.log(this.allPages);
      }
      } );
    }
    
  }

  calculatePages(currentPage: number, totalPages: number): void{
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
  } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
      } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
      }
  }
   // create an array of pages to ng-repeat in the pager control
   this.allPages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
  }

  goToPage(n: number): void {
    this.currentPage = n;
    this.getBookingsByPage();
  }

  onFirst(n: number): void {
    this.currentPage = n;
    this.getBookingsByPage();
  }

  onPrev(): void {
    this.currentPage--;
    this.getBookingsByPage();
}

  onNext(): void {
    this.currentPage++;
    this.getBookingsByPage();
  }

  onLast(n: number): void {
    this.currentPage = n;
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