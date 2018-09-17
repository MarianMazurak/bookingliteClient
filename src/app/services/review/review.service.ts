import {Injectable} from '@angular/core';
import {Review} from '../../models/review';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {CreateReview} from '../../models/create-review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private bookingUrl = '/api/booking';
  private propertyUrl = '/api/property';

  constructor(private http: HttpClient) {
  }

  public getReviewByBooking(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.bookingUrl}/${id}/review`);
  }

  public createReview(review: CreateReview, id: number): Observable<any> {
    return this.http.post(`${this.bookingUrl}/${id}/review`, review, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    });
  }

  public getPageAllReviewsByProperty(id: number, page: number, size: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.propertyUrl}/${id}/reviews?page=${page}&size=${size}`);
  }
  public getCountReviewByPropertyId(id: number): Observable<number> {
    return this.http.get<number>('/api/property/' + id + '/reviews/count');
  }
}

