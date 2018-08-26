import { Injectable } from '@angular/core';

import {Review} from '../../models/review';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Property} from '../../models/property';
import {Apartment} from '../../models/apartment';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewUrl = '/api/property';

  constructor(private http: HttpClient) { }

  public getAllReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewUrl}/${id}/reviews`);
  }
}
