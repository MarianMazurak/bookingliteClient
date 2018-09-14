import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-items-size',
  templateUrl: './items-size.component.html',
  styleUrls: ['./items-size.component.css']
})
export class ItemsSizeComponent implements OnInit {

  itemsSize:  number[] = [5, 10, 25];
  selectedItemsSize: number;

  @Output() sentSelectedItemsSize = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    if(  localStorage.getItem('selectedItemsSize')){
      this.selectedItemsSize = Number (localStorage.getItem('selectedItemsSize'));
    }
    else{
      this.selectedItemsSize = this.itemsSize[0];
      this.onSelectedItemsSize();
    }
  }

  onSelectedItemsSize(): void {
    localStorage.setItem('selectedItemsSize', String(this.selectedItemsSize));
    this.sentSelectedItemsSize.emit(this.selectedItemsSize);
    }

}
