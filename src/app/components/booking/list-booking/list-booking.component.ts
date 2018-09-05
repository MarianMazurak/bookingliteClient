import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/booking';
import { BookingService } from '../../../services/booking/booking.service';
import { PaginationService } from '../../../services/pagination/pagination.service';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.css']
})
export class ListBookingComponent implements OnInit {

  private authenticated;
  bookings: Booking[];
  currentPage: number ;
  selectedItemsSize: number;
  pagesToPagination : number [];//count page to show in pagination
  totalPages: number; // all pages with selected `selectedItemOnPage`
  totalElements: number;// condition in html. If==0 you not have booking
  filterBookingsByDates: string; //selected filter(all, actual, archieve)
  allBookingsString: string = "allBookings";
  actualBookingsString: string = "actualBookings";
  archieveBookingsString: string = "archieveBookings";
  

  constructor(private auth: AuthService,
              private bookingService: BookingService,
              private paginationService: PaginationService) { }
  
  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;// look here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if(window.location.href.split('/')[4] == this.actualBookingsString){ //all thischange on filterBookingsByDates= wind.location.href.get.[4]
      this.filterBookingsByDates= this.actualBookingsString;
    }
    else if(window.location.href.split('/')[4] == this.archieveBookingsString){
      this.filterBookingsByDates= this.archieveBookingsString;
    }
    else    this.filterBookingsByDates= this.allBookingsString;

    if(localStorage.getItem('selectedItemsSize')){//if localStorage!=null, else get value from item-size comp
      this.selectedItemsSize = Number (localStorage.getItem('selectedItemsSize'));
    }

    if( Number( window.location.href.split('/')[5]) != 1){//when you back with booking to list-bokings      
      this.currentPage=  Number( window.location.href.split('/')[5]); 
    }
    else{     
      this.currentPage= 1; 
    }
    this.getBookingsByPage();
  }

  getBookingsByPage(): void { 
    if(this.selectedItemsSize){
      this.currentPage= Number( window.location.href.split('/')[5]); 
      this.bookingService.getBookingsByPage( this.currentPage -1, this.selectedItemsSize,
        this.filterBookingsByDates).subscribe(data =>   {
          this.bookings= data['content'];
          this.totalPages= data['totalPages'];
          this.totalElements=  data['totalElements'];
          this.pagesToPagination= this.paginationService.calculatePages(this.currentPage, this.totalPages);
      } ); 
    }
  }
  
  setSelectedItemsSize(n: number): void{ //check
    this.selectedItemsSize= n;
    let newUrl: string = window.location.protocol+ "//"
                        + window.location.host +"/"
                        +window.location.href.split('/')[3] +"/"
                        +window.location.href.split('/')[4] +"/"
                        + 1 ;                   
    history.pushState(null, null, newUrl);    
    this.getBookingsByPage();
  }

  goToPage(n: number): void {
    let newUrl: string = window.location.protocol+ "//" //thisurl move to const Class!!!!!!!!!!
                        + window.location.host +"/"
                        +window.location.href.split('/')[3] +"/"
                        +window.location.href.split('/')[4] +"/"
                        + n ;                   
    history.pushState(null, null, newUrl);    
    this.getBookingsByPage();
  }

  onFirst(n: number): void {
    this.currentPage= n;
    let newUrl: string = window.location.protocol+ "//"
                        + window.location.host +"/"
                        +window.location.href.split('/')[3] +"/"
                        +window.location.href.split('/')[4] +"/"
                        + this.currentPage ;                   
    history.pushState(null, null, newUrl);    
    this.getBookingsByPage();
  }

  onPrev(): void {
    this.currentPage--;
    let newUrl: string = window.location.protocol+ "//"
                        + window.location.host +"/"
                        +window.location.href.split('/')[3] +"/"
                        +window.location.href.split('/')[4] +"/"
                        + this.currentPage ;                        
    history.pushState(null, null, newUrl);    
    this.getBookingsByPage();
}

  onNext(): void {    
    this.currentPage++;
    let newUrl: string = window.location.protocol+ "//"
                        + window.location.host +"/"
                        +window.location.href.split('/')[3] +"/"
                        +window.location.href.split('/')[4] +"/"
                        + this.currentPage ;                   
    history.pushState(null, null, newUrl);    
    this.getBookingsByPage();
  }

  onLast(n: number): void {
    this.currentPage= n;
    let newUrl: string = window.location.protocol+ "//"
                        + window.location.host +"/"
                        +window.location.href.split('/')[3] +"/"
                        +window.location.href.split('/')[4] +"/"
                        + this.currentPage ;                   
    history.pushState(null, null, newUrl);    
    this.getBookingsByPage();
  }

  isCanceled( bookingStatus: string): boolean {
    return  this.bookingService.isCanceled(bookingStatus);
  }

  isBookingDateActual(checkIn, checkOut):boolean {
    return this.bookingService.isBookingDateActual(checkIn, checkOut);
  }

  calculateNumberOfDates(checkIn, checkOut): number {
    return this.bookingService.calculateNumberOfDates(checkIn, checkOut);
  }

  filterAllBookings(){
    console.log("filterAllBookings");
    let newUrl: string = window.location.protocol+ "//"
                        + window.location.host +"/"
                        +window.location.href.split('/')[3] +"/"
                        +this.allBookingsString +"/"
                        + 1
    if(! window.location.href.includes(`${this.allBookingsString}`)){
      history.pushState(null, null, newUrl);
      this.filterBookingsByDates= this.allBookingsString;
      this.getBookingsByPage();
    }      
  }

  fiterActualBooking(){    
    console.log("fiterActualBooking");
    let url11 = window.location.href;
    let newUrl: string = window.location.protocol+ "//"
                        + window.location.host +"/"
                        +window.location.href.split('/')[3] +"/"
                        +this.actualBookingsString+"/"
                        + 1
    if(! window.location.href.includes(`${this.actualBookingsString}`)){
      history.pushState(null, null, newUrl);      
      this.filterBookingsByDates= this.actualBookingsString;
      this.getBookingsByPage();
    }            
  }

  filterArchieveBooking(){
    console.log("filterArchieveBooking");
    let newUrl: string = window.location.protocol+ "//"
                        + window.location.host +"/"
                        +window.location.href.split('/')[3] +"/"
                        +this.archieveBookingsString+"/"
                        + 1;
      if( ! window.location.href.includes(`${this.archieveBookingsString}`) ){
      history.pushState(null, null, newUrl);
      this.filterBookingsByDates= this.archieveBookingsString;
      this.getBookingsByPage();
    }      
  }
}
