import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BookingService } from '../services/booking/booking.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number; // the current page
  @Input() lastPage : number; // the current page
  @Input() allPages : number []; // the current page
  @Input() itemOnPage: number[]; 
  @Input() selectedItemOnPage: number; 
  @Input() pagesToShow: number; // how many pages between next/prev
  @Input() loading: boolean; // check if content is being loaded
  private firstPage =1;
  //itemsOnPage:  number[] = [1, 3, 5]; 
  

  @Output() goFirst = new EventEmitter<number>();
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goLast = new EventEmitter<number>();
  @Output() goPage = new EventEmitter<number>();

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    console.log("intemOnPage", this.itemOnPage);

  }

  // getMin(): number {
  //   return ((this.intemOnPage * this.currentPage) - this.intemOnPage) + 1;
  // }

  // getMax(): number {
  //   let max = this.intemOnPage * this.currentPage;
  //   if (max > this.allItem) {
  //     max = this.allItem;
  //   }
  //   return max;
  // }

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
    this.goLast.emit(this.lastPage);
  }  
}
