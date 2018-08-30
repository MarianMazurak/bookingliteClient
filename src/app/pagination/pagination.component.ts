import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BookingService } from '../services/booking/booking.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  private page: number = 0;
  private totalPages: number = 3;

  @Output()
  private changePage:EventEmitter<number>= new EventEmitter<number>();

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
  }

  next() : void{
    // this.bookingService.getBookingsByPage();
    this.changePage.emit(this.page +1);
  }

  prev(){
    this.changePage.emit(this.page -1);
  }

}
