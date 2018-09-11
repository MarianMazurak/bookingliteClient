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
  public searchUrl = 'api/property/search?';
  public advanceSearchUrl = 'api/property/advancesearch?';

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

  public advanceSearch(selectedCountryId: number,
          selectedCityId: number,
          checkIn: string,
          checkOut: string,
          numberOfGuests: number,
          price: number,
          arrayFacilities: number[],
          arrayAmenities: number[] ): Observable<Property[]> {
            let url: string= this.advanceSearchUrl +
            'countryId=' + selectedCountryId +
            '&cityId=' + selectedCityId +
            '&checkIn=' + checkIn +
            '&checkOut=' + checkOut +
            '&numberOfGuests=' + numberOfGuests +
            '&price=' + price+
            '&facilityIds='+ arrayFacilities +
            '&amenityIds='+ arrayAmenities;
            console.log("url advance s", url);
      return this.http.get<Property[]>(this.advanceSearchUrl +
      'countryId=' + selectedCountryId +
      '&cityId=' + selectedCityId +
      '&checkIn=' + checkIn +
      '&checkOut=' + checkOut +
      '&numberOfGuests=' + numberOfGuests +
      '&price=' + price+
      '&facilityIds='+ arrayFacilities +
      '&amenityIds='+ arrayAmenities);
}

  public getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.url);
  }

  public getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>(this.url + id);
  }

}
