import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Facility} from '../../models/facility';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  constructor(private http: HttpClient) { }

  public getAllFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>("api/facilities")
  }
}
