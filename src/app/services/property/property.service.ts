import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import { Property } from '../../models/property';
import {PropertyCreate} from '../../models/property-create';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  public createProperty(model: PropertyCreate) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(model, 'JSON');
    return this.http.post('api/addproperty', model, httpOptions);
  }

  public getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>('api/property');
  }

  public getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>('api/property/' + id);
  }

  public search(selectedCountryId: number,
                selectedCityId: number,
                checkIn: string,
                checkOut: string,
                numberOfGuests: number): Observable<Property[]> {
    return this.http.get<Property[]>('api/property/search?' +
      'countryId=' + selectedCountryId +
      '&cityId=' + selectedCityId +
      '&checkIn=' + this.parseData(checkIn)  +
      '&checkOut=' + this.parseData(checkOut) +
      '&numberOfGuests=' + numberOfGuests);
  }

  public parseData(data: string): string {
    return data.split('-')[2] + '/' +
      data.split('-')[1] + '/' +
      data.split('-')[0];
  }
}
