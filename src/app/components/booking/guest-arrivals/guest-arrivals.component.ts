import {Component, OnInit} from '@angular/core';
import {Booking} from '../../../models/booking';
import {BookingService} from '../../../services/booking/booking.service';
import {ActivatedRoute} from '@angular/router';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {PropertyService} from '../../../services/property/property.service';
import {Property} from '../../../models/property';

@Component({
  selector: 'app-guest-arrivals',
  templateUrl: './guest-arrivals.component.html',
  styleUrls: ['./guest-arrivals.component.css']
})
export class GuestArrivalsComponent implements OnInit {
  guestArrivalsList: Booking[];
  currentPage = 1;
  selectedItemsSize = 5;
  pagesToPagination: number [];
  totalPages: number;
  totalElements: number;
  filterBookings: string;
  futureBookings = 'futureBookings';
  actualBookings = 'actualBookings';
  pastBookings = 'pastBookings';
  public isLoading = false;
  property: Property;

  constructor(private bookingService: BookingService,
              private route: ActivatedRoute,
              private paginationService: PaginationService,
              private propertyService: PropertyService) {
  }

  ngOnInit() {
    if (window.location.href.split('/')[5] === this.actualBookings) {
      this.filterBookings = this.actualBookings;
    } else if (window.location.href.split('/')[5] === this.pastBookings) {
      this.filterBookings = this.pastBookings;
    } else {
      this.filterBookings = this.futureBookings;
    }
    this.getBookingsByPage();
    this.getProperty();
  }

  getBookingsByPage(): void {
    this.isLoading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    if (this.selectedItemsSize) {
      this.bookingService.getPageGuestArrivalsList(id, this.currentPage - 1, this.selectedItemsSize,
        this.filterBookings).subscribe(data => {
        this.guestArrivalsList = data['content'];
        this.totalPages = data['totalPages'];
        this.totalElements = data['totalElements'];
        this.pagesToPagination = this.paginationService.calculatePages(this.currentPage, this.totalPages);
        this.isLoading = false;
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
    const newUrl: string = window.location.protocol + '//' + window.location.host + '/'
      + window.location.pathname.split('/')[1] + '/'
      + window.location.pathname.split('/')[2] + '/'
      + window.location.pathname.split('/')[3] + '/'
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

  filterActualBooking() {
    const newUrl: string = window.location.protocol + '//' + window.location.host + '/'
      + window.location.pathname.split('/')[1] + '/'
      + window.location.pathname.split('/')[2] + '/'
      + window.location.pathname.split('/')[3] + '/'
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
    const newUrl: string = window.location.protocol + '//' + window.location.host + '/'
      + window.location.pathname.split('/')[1] + '/'
      + window.location.pathname.split('/')[2] + '/'
      + window.location.pathname.split('/')[3] + '/'
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
  getProperty(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getPropertyById(id).subscribe(pr => this.property = pr);
  }
}
