import { Injectable } from '@angular/core';

import {Review} from '../../models/review';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Property} from '../../models/property';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  public getReviewCountByPropertyId(id:number): Observable<number>{
    return this.http.get<number>("api/property/${id}/reviews/count");
  }
}
