import {Component, OnInit} from '@angular/core';
import {Review} from '../../../models/review';
import {ActivatedRoute} from '@angular/router';
import {ReviewService} from '../../../services/review/review.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {Property} from '../../../models/property';
import {PropertyService} from '../../../services/property/property.service';

@Component({
  selector: 'app-reviews-property',
  templateUrl: './reviews-property.component.html',
  styleUrls: ['./reviews-property.component.css']
})
export class ReviewsPropertyComponent implements OnInit {
  reviews: Review [];
  property: Property;
  currentPage = 1;
  selectedItemsSize = 10;
  pagesToPagination: number [];
  totalPages: number;
  totalElements: number;
  public isLoading = false;

  constructor(private route: ActivatedRoute,
              private reviewService: ReviewService,
              private paginationService: PaginationService,
              private propertyService: PropertyService) {
  }

  ngOnInit() {
    this.getReviewsByPage();
    this.getProperty();
  }

  getReviewsByPage(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (this.selectedItemsSize) {
      this.reviewService.getPageAllReviewsByProperty(id, this.currentPage - 1, this.selectedItemsSize)
        .subscribe(data => {
          this.reviews = data['content'];
          this.totalPages = data['totalPages'];
          this.totalElements = data['totalElements'];
          this.pagesToPagination = this.paginationService.calculatePages(this.currentPage, this.totalPages);
        });
    }
  }

  setSelectedItemsSize(n: number): void {
    this.selectedItemsSize = n;
    this.currentPage = 1;
    this.getReviewsByPage();
  }

  goToPage(n: number): void {
    this.currentPage = n;
    this.getReviewsByPage();
  }

  onFirst(n: number): void {
    this.currentPage = n;
    this.getReviewsByPage();
  }

  onPrev(): void {
    this.currentPage--;
    this.getReviewsByPage();
  }

  onNext(): void {
    this.currentPage++;
    this.getReviewsByPage();
  }

  onLast(n: number): void {
    this.currentPage = n;
    this.getReviewsByPage();
  }

  getProperty(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getPropertyById(id).subscribe(pr => this.property = pr);
  }
}
