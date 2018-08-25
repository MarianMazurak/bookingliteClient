import { Component, OnInit, enableProdMode } from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';
import {ReviewService} from '../../../services/review/review.service';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})
export class ReviewCreateComponent implements OnInit {
  private authenticated;
  reviewDto = {
    rating: '',
    message: '',
    guests: ''
  };
  constructor(private auth: AuthService,
              private reviewService: ReviewService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
  }
  createReview(form: FormGroup) {
    const id = +this.route.snapshot.paramMap.get('id');
   // this.reviewService.createReview(this.reviewDto, id);
  }

}
