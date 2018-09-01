import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  calculatePages(currentPage: number, totalPages: number ): number []{ 
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
  } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
      } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
      }
  }
   // create an array of pages to ng-repeat in the pager control
   return Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
  }
}
