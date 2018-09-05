import {Injectable} from '@angular/core';
import {Review} from '../../models/review';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {CreateReview} from '../../models/create-review';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private bookingUrl = '/api/booking';
  private propertyUrl = '/api/property'

  constructor(private http: HttpClient) {
  }

  public getReviewCountByPropertyId(id: number): Observable<number> {
    return this.http.get<number>('${this.propertyUrl}/${id}/reviews/count');
  }

  public getReviewByBooking(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.bookingUrl}/${id}/review`);
  }

  public createReview(review: CreateReview, id: number): Observable<any> {
    console.log('service review', review);
    return this.http.post(`${this.bookingUrl}/${id}/review`, review, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    });
  }

  public getAllReviewsByProperty(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.propertyUrl}/${id}/reviews`);
  }

  public getUserDetails(): Observable<User> {
    return this.http.get<User>(`/api/hello`);
  }
}

