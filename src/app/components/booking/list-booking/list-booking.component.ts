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
  filterBookingsByDates: string = "allBookings"; //move to url + color active
  currentUrl: string = window.location.href;//use in filteBookingByDates
  

  constructor(private bookingService: BookingService,
              private paginationService: PaginationService) { }
  
  ngOnInit() {
    history.pushState(null, null, window.location.href+"/allBookings"); //look here!!!!!!!!!
    console.log("111", window.location.host);
    console.log("222",window.location.hostname);
    console.log("333",window.location.pathname);
    console.log("4",window.location.port);
    console.log("5",window.location.protocol);
    console.log("6",window.location.href.split('/')[3]);
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
    const allBookings = "allBookings";
    let actualBookingsUrl: string = "http://localhost:4200/bookings/allBookings";    
    let newUrl: string = window.location.href+"/allBookings"; //look here!!!!!!!!!!!!!!!!!!!
    if(this.currentUrl != actualBookingsUrl){
      history.pushState(null, null, newUrl);
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
  }

  fiterActualBooking(){    
    const actualBookings = "actualBookings";
    let actualBookingsUrl: string = "http://localhost:4200/bookings/actualBookings";    
    let newUrl: string = window.location.href+"/actualBookings";//look here!!!!!!!!!!!!!!!!!!!
    if(this.currentUrl != actualBookingsUrl){
      history.pushState(null, null, newUrl);
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
  }

  filterArchieveBooking(){
    const archieveBookings = "archieveBookings";
    let actualBookingsUrl: string = "http://localhost:4200/bookings/archieveBookings";    
    let newUrl: string = window.location.href+"/archieveBookings";//look here!!!!!!!!!!!!!!!!!!!
    if(this.currentUrl != actualBookingsUrl){
      history.pushState(null, null, newUrl);
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
}