import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/booking';
import { BookingService } from '../../../services/booking/booking.service';
import { PaginationService } from '../../../services/pagination/pagination.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.css']
})
export class ListBookingComponent implements OnInit {

  bookings: Booking[];
  currentPage: number = 1;
  selectedItemsSize: number;
  pagesToPagination : number [];//count page to show in pagination
  totalPages: number; // all pages with selected `selectedItemOnPage`
  totalElements: number;// condition in html. If==0 you not have booking
  filterBookingsByDates: string = "AllBookings"; //move to url + color active
  

  constructor(private bookingService: BookingService,
              private paginationService: PaginationService) { }
  
  ngOnInit() {
    this.getBookingsByPage();
  }

  getBookingsByPage(): void { 
    if(this.selectedItemsSize){
      this.bookingService.getBookingsByPage(this.currentPage -1, this.selectedItemsSize,
           this.filterBookingsByDates).subscribe(data =>   {
        this.bookings= data['content'];
        this.totalPages= data['totalPages'];
        this.totalElements=  data['totalElements'];
        this.pagesToPagination= this.paginationService.calculatePages(this.currentPage, this.totalPages);
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

  isBookingDateActual(checkIn, checkOut):boolean {
    return this.bookingService.isBookingDateActual(checkIn, checkOut);
  }

  calculateNumberOfDates(checkIn, checkOut): number{
    return this.bookingService.calculateNumberOfDates(checkIn, checkOut);
  }

  filterAllBookings(){
    const allBookings = "AllBookings";
    if(this.filterBookingsByDates != allBookings){
      this.currentPage = 1;
    }
    this.filterBookingsByDates= allBookings;
    if(this.selectedItemsSize){
      this.bookingService.getBookingsByPage(this.currentPage -1, this.selectedItemsSize, allBookings).subscribe(data =>   {
        this.bookings= data['content'];
        this.totalPages= data['totalPages'];
        this.totalElements=  data['totalElements'];
        this.pagesToPagination= this.paginationService.calculatePages(this.currentPage, this.totalPages);
      } ); 
    }
  }
  fiterActualBooking(){
    const actualBookings = "ActualBookings";    
    if(this.filterBookingsByDates != actualBookings){
      this.currentPage = 1;
    }
    this.filterBookingsByDates= actualBookings;
    if(this.selectedItemsSize){
      this.bookingService.getBookingsByPage(this.currentPage -1, this.selectedItemsSize, actualBookings).subscribe(data =>   {
        this.bookings= data['content'];
        this.totalPages= data['totalPages'];
        this.totalElements=  data['totalElements'];
        this.pagesToPagination= this.paginationService.calculatePages(this.currentPage, this.totalPages);
      } ); 
    }
  }
  filterArchieveBooking(){
    const archieveBookings = "ArchieveBookings";
    if(this.filterBookingsByDates != archieveBookings){
      this.currentPage = 1;
    }
    this.filterBookingsByDates= archieveBookings;
    if(this.selectedItemsSize){
      this.bookingService.getBookingsByPage(this.currentPage -1, this.selectedItemsSize, archieveBookings).subscribe(data =>   {
        this.bookings= data['content'];
        this.totalPages= data['totalPages'];
        this.totalElements=  data['totalElements'];
        this.pagesToPagination= this.paginationService.calculatePages(this.currentPage, this.totalPages);
      } ); 
    }
  }
}