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
     return this.http.post('api/property', model, httpOptions);
  }

  public getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>('api/property');
  }

  public getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>('api/property/' + id);
  }

  public getOwnerProperties(): Observable<Property[]> {
    return this.http.get<Property[]>('api/myproperties');
  }
  public updateProperty(model: PropertyCreate, id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put('api/property/' + id, model, httpOptions);
  }
  public search(selectedCountryId: number,
                selectedCityId: number,
                checkIn: string,
                checkOut: string,
                numberOfGuests: number): Observable<Property[]> {
    return this.http.get<Property[]>('api/property/search?' +
      'countryId=' + selectedCountryId +
      '&cityId=' + selectedCityId +
      '&checkIn=' + checkIn +
      '&checkOut=' + checkOut +
      '&numberOfGuests=' + numberOfGuests);
  }
  public advancedSearch(selectedCountryId: number,
                        selectedCityId: number,
                        checkIn: string,
                        checkOut: string,
                        numberOfGuests: number,
                        selectedPrice: number,
                        facilityIds: string[],
                        amenityIds: string[]): Observable<Property[]> {
    return this.http.get<Property[]>('api/property/advancesearch?' +
      'countryId=' + selectedCountryId +
      '&cityId=' + selectedCityId +
      '&checkIn=' + checkIn +
      '&checkOut=' + checkOut +
      '&numberOfGuests=' + numberOfGuests +
      '&price=' + selectedPrice +
      '&facilityIds=' + facilityIds +
      '&amenityIds=' + amenityIds);
  }
}
