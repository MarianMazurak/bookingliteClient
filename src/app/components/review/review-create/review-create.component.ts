import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';
import {ReviewService} from '../../../services/review/review.service';
import {ActivatedRoute} from '@angular/router';
import {Review} from '../../../models/review';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})
export class ReviewCreateComponent implements OnInit {
  private authenticated;
  review: Review;
  constructor(private auth: AuthService,
              private reviewService: ReviewService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
  }
  createReview() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.reviewService.createReview(this.review, id);
  }

}
