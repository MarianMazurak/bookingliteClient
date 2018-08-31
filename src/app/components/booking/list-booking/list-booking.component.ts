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
  currentPage = 1;
  zeroPage: boolean= true;
  lastPage: number;
  allPages : number [];
  itemOnPage:  number[] = [1, 3, 5]; 
  private selectedItemOnPage: number=1;

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
    if(this.zeroPage){      
      this.bookingService.getBookingsByPage(this.currentPage, this.selectedItemOnPage).subscribe(data => {  {
        this.bookings= data['content'];
        console.log(data);
        this.lastPage=data['totalPages'];
        this.calculatePages(this.currentPage, this.lastPage);
        this.zeroPage = false;
        console.log(this.currentPage);
        console.log(this.allPages);
      }
      } );
    }
    else if( !this.zeroPage){
      let curPage= this.currentPage -1;
      this.bookingService.getBookingsByPage(curPage, this.selectedItemOnPage).subscribe(data => {  {
        this.bookings= data['content']; 
        console.log(data);
        this.lastPage=data['totalPages'];
        this.calculatePages(this.currentPage, this.lastPage);
        this.zeroPage = false;
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