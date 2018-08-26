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
  private reviewUrl = '/api/booking';

  private propertyUrl = '/api/property';

  constructor(private http: HttpClient) {
  }


  public getReviewCountByPropertyId(id: number): Observable<number> {
    return this.http.get<number>('api/property/${id}/reviews/count');
  }

  public getReviewByBooking(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.reviewUrl}/${id}/review`);
  }

  public getAllReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.propertyUrl}/${id}/reviews`);
  }

  public createReview(review: CreateReview, id: number): Observable<any> {
    console.log('service : ', review);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log('url : ', `${this.reviewUrl}/${id}/review`);
    console.log('return : ', this.http.post(`${this.reviewUrl}/${id}/review`, review, httpOptions));
    return this.http.post(`${this.reviewUrl}/${id}/review`, review, httpOptions);
  }
  public getUserDetails(): Observable<User> {
    return this.http.get<User>(`/api/hello`);

  }
}
