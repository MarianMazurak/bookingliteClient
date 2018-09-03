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

  public url = 'api/addproperty';
  public searchUrl = 'api/property/advancesearch?';
  private mainSearchParameters = null;

  constructor(private http: HttpClient) { }

  public createProperty(model: PropertyCreate) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(model, 'JSON');
    return this.http.post(this.url, model, httpOptions);
  }

  public search(selectedCountryId: number,
                selectedCityId: number,
                checkIn: string,
                checkOut: string,
                numberOfGuests: number): Observable<Property[]> {
    return this.http.get<Property[]>(this.searchUrl +
      'countryId=' + selectedCountryId +
      '&cityId=' + selectedCityId +
      '&checkIn=' + checkIn +
      '&checkOut=' + checkOut +
      '&numberOfGuests=' + numberOfGuests +
      '&price&facilities&amenities');
  }

  public getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.url);
  }

  public getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>(this.url + id);
  }

  public saveMainSearchParameters(countryId: number,
                                  cityId: number,
                                  checkIn: string,
                                  checkOut: string,
                                  numberOfGuests: number) {
    this.mainSearchParameters = {countryId: countryId,
      cityId: cityId,
      checkIn: checkIn,
      checkOut: checkOut,
      numberOfGuests: numberOfGuests};
  }

  public get MainSearchParameters() {
    return this.mainSearchParameters;
  }

  public cleanSelectedParameters() {
    this.mainSearchParameters = null;
  }

}
