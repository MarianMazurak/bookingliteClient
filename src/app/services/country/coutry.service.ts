import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Country } from '../../models/country';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoutryService {

  constructor(private http: HttpClient) { }

  public getCountry(): Observable<Country[]> {
    return this.http.get<Country[]>("api/countries")
  }
}
