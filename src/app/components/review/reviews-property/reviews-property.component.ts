import { Component, OnInit } from '@angular/core';
import {Review} from '../../../models/review';
import {AuthService} from '../../../services/authentication/auth.service';
import {ActivatedRoute} from '@angular/router';
import {ReviewService} from '../../../services/review/review.service';

@Component({
  selector: 'app-reviews-property',
  templateUrl: './reviews-property.component.html',
  styleUrls: ['./reviews-property.component.css']
})
export class ReviewsPropertyComponent implements OnInit {
  private authenticated;
  reviews: Review [];
  constructor( private auth: AuthService,
               private route: ActivatedRoute,
               private reviewService: ReviewService) { }
  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getReviewsByProperty();
  }
  getReviewsByProperty() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.reviewService.getAllReviewsByProperty(id).subscribe(r => this.reviews = r);
  }
}
