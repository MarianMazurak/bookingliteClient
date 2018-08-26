import {Component, OnInit, enableProdMode} from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';
import {ReviewService} from '../../../services/review/review.service';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {CreateReview} from '../../../models/create-review';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})
export class ReviewCreateComponent implements OnInit {
  private authenticated;
  review = {
    message: '',
    rating: 10
  };

  constructor(private auth: AuthService,
              private reviewService: ReviewService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
  }

  createReview(form: FormGroup) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.reviewService.createReview(this.review, id);
  }

  goBack() {
    this.location.back();
  }
}
