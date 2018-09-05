import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-items-size',
  templateUrl: './items-size.component.html',
  styleUrls: ['./items-size.component.css']
})
export class ItemsSizeComponent implements OnInit {

  itemsSize:  number[] = [1, 3, 5]; 
  selectedItemsSize: number= this.itemsSize[0];

  @Output() sentSelectedItemsSize = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    //if cookie works if(cookie exist){this.selectedItemsSize= cookie} else {selectedItemsSize=this.item.size=[0]}
    this.onSelectedItemsSize();
  }

  onSelectedItemsSize(): void {
      this.sentSelectedItemsSize.emit(this.selectedItemsSize);
    }

}
