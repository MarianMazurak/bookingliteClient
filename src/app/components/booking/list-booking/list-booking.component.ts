import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking/booking.service';
import { PaginationService } from '../../../services/pagination/pagination.service';
import { AuthService } from '../../../services/authentication/auth.service';
import {BookingDto} from '../../../models/bookingDto';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.css']
})
export class ListBookingComponent implements OnInit {

  public isLoading = false;
  public bookings: BookingDto[];
  public currentPage: number ;
  public selectedItemsSize: number;
  public pagesToPagination : number [];//count page to show in pagination
  public totalPages: number; // all pages (to last page in pagination)
  public totalElements: number;// condition in html. If==0 you not have booking
  public filterBookingsByDates: string; //selected filter(all, current, archieved)
  public allBookingsString: string = "allBookings";
  public currentBookingsString: string = "currentBookings";
  public archievedBookingsString: string = "archievedBookings";
  public baseBookingUrl: string = window.location.protocol+ "//"
                       +window.location.host +"/"
                       + "bookings" ;                     
  

constructor(private bookingService: BookingService,
              private paginationService: PaginationService,
              private route: ActivatedRoute) { }
  
  ngOnInit() {
    if( this.route.snapshot.queryParamMap.get('filter') ){
      this.filterBookingsByDates=  this.route.snapshot.queryParamMap.get('filter');
    }
    else{
      this.filterBookingsByDates= this.allBookingsString;
    }    

    if(localStorage.getItem('selectedItemsSize')){//if localStorage!=null, else get value from item-size comp
      this.selectedItemsSize = Number (localStorage.getItem('selectedItemsSize'));
    }

    if( Number(this.route.snapshot.queryParamMap.get('page')) ){//when you back with booking to list-bokings      
      this.currentPage= Number(this.route.snapshot.queryParamMap.get('page')); 
    }
    else{
    this.currentPage= 1;     
    }

    if( !Number(this.route.snapshot.queryParamMap.get('page'))
          && !this.route.snapshot.queryParamMap.get('filter')){
      let newUrl: string = this.getUrlWithPageAndFilter(this.currentPage, this.filterBookingsByDates);        
      history.pushState(null, null, newUrl);    
    }    
    this.getBookingsByPage();
  }

  getBookingsByPage(): void { 
    this.isLoading = true;
      this.bookingService.getBookingsByPage( this.currentPage -1, this.selectedItemsSize,
        this.filterBookingsByDates).subscribe(data =>   {
          this.bookings= data['content'];
          this.totalPages= data['totalPages'];
          this.totalElements=  data['totalElements'];
          this.pagesToPagination= this.paginationService.calculatePages(this.currentPage, this.totalPages);
          this.isLoading = false;
      }, error => this.isLoading = false ); 
  }
  
  setSelectedItemsSize(n: number): void{ 
    this.selectedItemsSize= n;
    this.currentPage= 1; 
    let newUrl: string = this.getUrlWithPageAndFilter(1, this.filterBookingsByDates);                
    history.pushState(null, null, newUrl);    
    this.getBookingsByPage();
  }

  setUlrToLocalStorage(){
    localStorage.setItem('urlToButtonBackToListBookings', window.location.href);
  }

  goToPage(n: number): void {
    this.currentPage= n;
    let newUrl: string = this.getUrlWithPageAndFilter(this.currentPage, this.filterBookingsByDates);    
    history.pushState(null, null, newUrl);    
    this.getBookingsByPage();
  }

  onFirst(n: number): void {
    this.currentPage= n;
    let newUrl: string = this.getUrlWithPageAndFilter(this.currentPage, this.filterBookingsByDates);            
    history.pushState(null, null, newUrl);    
    this.getBookingsByPage();
  }

  onPrev(): void {
    this.currentPage--;
    let newUrl: string = this.getUrlWithPageAndFilter(this.currentPage, this.filterBookingsByDates);               
    history.pushState(null, null, newUrl);    
    this.getBookingsByPage();
}

  onNext(): void {    
    this.currentPage++;
    let newUrl: string = this.getUrlWithPageAndFilter(this.currentPage, this.filterBookingsByDates);   
    history.pushState(null, null, newUrl);    
    this.getBookingsByPage();
  }

  onLast(n: number): void {
    this.currentPage= n;
    let newUrl: string = this.getUrlWithPageAndFilter(this.currentPage, this.filterBookingsByDates);
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
    let newUrl: string = this.getUrlWithPageAndFilter(1, this.allBookingsString);
    if( this.route.snapshot.queryParamMap.get('filter') != this.allBookingsString ){
      this.currentPage= 1; 
      history.pushState(null, null, newUrl);
      this.filterBookingsByDates= this.allBookingsString;
      this.getBookingsByPage();
    }      
  }

  fiterCurrentBookings(){    
    let newUrl: string = this.getUrlWithPageAndFilter(1, this.currentBookingsString);
    if( this.route.snapshot.queryParamMap.get('filter') != this.currentBookingsString ){
      this.currentPage= 1; 
      history.pushState(null, null, newUrl);      
      this.filterBookingsByDates= this.currentBookingsString;
      this.getBookingsByPage();
    }            
  }

  filterArchievedBookings(){
    let newUrl: string = this.getUrlWithPageAndFilter(1, this.archievedBookingsString);
      if( this.route.snapshot.queryParamMap.get('filter') != this.archievedBookingsString ){
      this.currentPage= 1; 
      history.pushState(null, null, newUrl);
      this.filterBookingsByDates= this.archievedBookingsString;
      this.getBookingsByPage();
    }      
  }

  getUrlWithPageAndFilter(page: number, filter: string): string{
    return this.baseBookingUrl  + "?page="+ page +"&filter="+ filter;
  }
}
