import { Injectable } from '@angular/core';

import {Review} from '../../models/review';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Property} from '../../models/property';

import {HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {CreateReview} from '../../models/create-review';

import {Apartment} from '../../models/apartment';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewUrl = '/api/booking';

  // private reviewUrl = '/api/property';

  constructor(private http: HttpClient) { }


  public getReviewCountByPropertyId(id: number): Observable<number> {
    return this.http.get<number>('api/property/${id}/reviews/count');
  }
  public getReviewByBooking(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.reviewUrl}/${id}/review`);
  }
  public createReview(review: CreateReview, id: number): Observable<any> {
    return this.http.post('${this.reviewUrl}/${id}/review',
      JSON.stringify({message: review.message, rating: review.rating}),
      {headers: new HttpHeaders({
          'Content-Type':  'application/json' }),
        responseType: 'text'
      }  );
    }

  public getAllReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewUrl}/${id}/reviews`);
  }

  public getUserDetails(): Observable<User> {
    return this.http.get<User>(`/api/hello`);
  }
}

