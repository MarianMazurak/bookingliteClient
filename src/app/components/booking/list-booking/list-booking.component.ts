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
  filterBookingsByDates: string; //= "allBookings"; //move to url + color active  
  allBookingsString: string = "allBookings";
  actualBookingsString: string = "actualBookings";
  archieveBookingsString: string = "archieveBookings";
  

  constructor(private bookingService: BookingService,
              private paginationService: PaginationService) { }
  
  ngOnInit() {
    if(window.location.href.split('/')[4] == this.actualBookingsString){ //get 'filter' from url from Router
      this.filterBookingsByDates= this.actualBookingsString;
    }
    else if(window.location.href.split('/')[4] == this.archieveBookingsString){
      this.filterBookingsByDates= this.archieveBookingsString;
    }
    else    this.filterBookingsByDates= this.allBookingsString;
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
    let newUrl: string = window.location.protocol+ "//"
                        + window.location.host +"/"
                        +window.location.href.split('/')[3] +"/"
                        +this.allBookingsString
    if(window.location.href != newUrl){
      history.pushState(null, null, newUrl);
      if(this.filterBookingsByDates != this.allBookingsString){
        this.currentPage = 1;
      }
      this.filterBookingsByDates= this.allBookingsString;
      this.getBookingsByPage();
    }      
  }

  fiterActualBooking(){    
    let url11 = window.location.href;
    let newUrl: string = window.location.protocol+ "//"
                        + window.location.host +"/"
                        +window.location.href.split('/')[3] +"/"
                        +this.actualBookingsString
    if(window.location.href != newUrl){
      history.pushState(null, null, newUrl);
      if(this.filterBookingsByDates != this.actualBookingsString){
        this.currentPage = 1;
      }
      this.filterBookingsByDates= this.actualBookingsString;
      this.getBookingsByPage();
    }            
  }

  filterArchieveBooking(){
    let newUrl: string = window.location.protocol+ "//"
                        + window.location.host +"/"
                        +window.location.href.split('/')[3] +"/"
                        +this.archieveBookingsString
    if(window.location.href != newUrl){
      history.pushState(null, null, newUrl);
      if(this.filterBookingsByDates != this.archieveBookingsString){
        this.currentPage = 1;
      }
      this.filterBookingsByDates= this.archieveBookingsString;
      this.getBookingsByPage();
    }      
  }
}