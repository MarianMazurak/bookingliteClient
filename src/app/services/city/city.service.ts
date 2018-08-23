import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { City } from '../../models/city';
import {Observable} from 'rxjs';
import {Country} from '../../models/country';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  public getCity(countryId: number): Observable<City[]> {
    return this.http.get<City[]>(`api/country/${countryId}/cities`)
  }
}
