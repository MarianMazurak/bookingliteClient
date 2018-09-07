import {Component, OnInit} from '@angular/core';
import {Booking} from '../../../models/booking';
import {AuthService} from '../../../services/authentication/auth.service';
import {BookingService} from '../../../services/booking/booking.service';
import {ActivatedRoute} from '@angular/router';
import {PaginationService} from '../../../services/pagination/pagination.service';

@Component({
  selector: 'app-guest-arrivals',
  templateUrl: './guest-arrivals.component.html',
  styleUrls: ['./guest-arrivals.component.css']
})
export class GuestArrivalsComponent implements OnInit {
  private authenticated;
  guestArrivalsList: Booking[];
  currentPage = 1;
  selectedItemsSize: number;
  pagesToPagination: number []; // count page to show in pagination
  totalPages: number; // all pages with selected `selectedItemOnPage`
  totalElements: number; // condition in html. If==0 you not have booking
  filterBookings: string;
  futureBookings = 'futureBookings';
  actualBookings = 'actualBookings';
  pastBookings = 'pastBookings';

  constructor(private auth: AuthService,
              private bookingService: BookingService,
              private route: ActivatedRoute,
              private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    console.log('4---------', window.location.href.split('/')[4]);
    if (window.location.href.split('/')[5] === this.actualBookings) {
      this.filterBookings = this.actualBookings;
    } else if (window.location.href.split('/')[5] === this.pastBookings) {
      this.filterBookings = this.pastBookings;
    } else {
      this.filterBookings = this.futureBookings;
    }
    this.getBookingsByPage();
  }

  isBookingDateActual(checkIn, checkOut): boolean {
    return this.bookingService.isBookingDateActual(checkIn, checkOut);
  }

  calculateNumberOfDates(checkIn, checkOut): number {
    return this.bookingService.calculateNumberOfDates(checkIn, checkOut);
  }

  getBookingsByPage(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (this.selectedItemsSize) {
      this.bookingService.getPageGuestArrivalsList(id, this.currentPage - 1, this.selectedItemsSize,
        this.filterBookings).subscribe(data => {
        this.guestArrivalsList = data['content'];
        this.totalPages = data['totalPages'];
        this.totalElements = data['totalElements'];
        this.pagesToPagination = this.paginationService.calculatePages(this.currentPage, this.totalPages);
      });
    }
  }

  setSelectedItemsSize(n: number): void {
    this.selectedItemsSize = n;
    this.currentPage = 1;
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

  filterFutureBookings() {
    let newUrl: string = window.location.protocol + '//'
      + window.location.host + '/'
      + window.location.href.split('/')[4] + '/'
      + this.futureBookings;
    if (window.location.href !== newUrl) {
      history.pushState(null, null, newUrl);
      if (this.filterBookings !== this.futureBookings) {
        this.currentPage = 1;
      }
      this.filterBookings = this.futureBookings;
      this.getBookingsByPage();
    }
  }

  fiterActualBooking() {
    let newUrl: string = window.location.protocol + '//'
      + window.location.host + '/'
      + window.location.href.split('/')[4] + '/'
      + this.actualBookings;
    if (window.location.href !== newUrl) {
      history.pushState(null, null, newUrl);
      if (this.filterBookings !== this.actualBookings) {
        this.currentPage = 1;
      }
      this.filterBookings = this.actualBookings;
      this.getBookingsByPage();
    }
  }

  filterPastBooking() {
    let newUrl: string = window.location.protocol + '//'
      + window.location.host + '/'
      + window.location.href.split('/')[4] + '/'
      + this.pastBookings;
    if (window.location.href !== newUrl) {
      history.pushState(null, null, newUrl);
      if (this.filterBookings !== this.pastBookings) {
        this.currentPage = 1;
      }
      this.filterBookings = this.pastBookings;
      this.getBookingsByPage();
    }
  }
}
