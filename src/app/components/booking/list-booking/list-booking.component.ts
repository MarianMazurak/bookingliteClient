import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/booking';
import { BookingService } from '../../../services/booking/booking.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { PaginationService } from '../../../services/pagination/pagination.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.css']
})
export class ListBookingComponent implements OnInit {

  bookings: Booking[];
  currentPage = 1;
  selectedItemsSize: number;
  pagesToPagination : number [];//count page to show in pagination
  totalPages: number; // all pages with selected `selectedItemOnPage`
  totalElements: number;// condition in html. If==0 you not have booking

  constructor(private bookingService: BookingService,
              private paginationService: PaginationService) { }
  
  ngOnInit() {
    this.getBookingsByPage();
  }

  getBookingsByPage(): void { //evry next page- is way to DB. It is normal????????
    if(this.currentPage && this.selectedItemsSize){
      this.bookingService.getBookingsByPage(this.currentPage -1, this.selectedItemsSize).subscribe(data =>   {
        this.bookings= data['content'];
        this.totalPages= data['totalPages'];
        this.totalElements=  data['totalElements'];
        this.pagesToPagination= this.paginationService.calculatePages(this.currentPage, this.totalPages);
        console.log(data);
      } ); 
    }
  }
  
  setSelectedItemsSize(n: number): void{
    this.selectedItemsSize= n;
    this.getBookingsByPage();
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