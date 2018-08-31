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
  private firstPage =1;
  //itemsOnPage:  number[] = [1, 3, 5]; 
  

  @Output() goFirst = new EventEmitter<number>();
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goLast = new EventEmitter<number>();
  @Output() goPage = new EventEmitter<number>();
  @Output() sentSelectedItemOnPage = new EventEmitter<number>();

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.selectedItemOnPage= this.itemOnPage[0];
    console.log("intemOnPage", this.itemOnPage);
  }

  onSelectedItemOnPage(): void {
    this.sentSelectedItemOnPage.emit(this.selectedItemOnPage);
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
    this.goLast.emit(this.lastPage);
  }  
}
