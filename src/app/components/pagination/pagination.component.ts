import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';



@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number; // the current page
  @Input() totalPages : number;  //all page
  @Input() pagesToPagination : number []; //count page to show in pagination
  private firstPage = 1;  

  @Output() goFirst = new EventEmitter<number>();
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goLast = new EventEmitter<number>();
  @Output() goPage = new EventEmitter<number>();

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
  }

  onPage(n: number): void {
    this.goPage.emit(n);
  }

  onFirst(): void {
    this.goFirst.emit(this.firstPage);
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }

  onNext(next: boolean): void {
    this.goNext.emit(next);
  }

  onLast(): void {
    this.goLast.emit(this.totalPages);
  }  
}
