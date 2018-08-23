import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Apartment} from '../../models/apartment';
import {tap} from 'rxjs/operators';
import {ApartmentType} from '../../models/apartment-type';
import {Amenity} from '../../models/amenity';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apartmentUrl = '/api/property/1/apartment';
  private typeUrl = '/api/create-apartment/apartment-type';
  private amenityUrl = '/api/create-apartment/amenities';

  constructor(private http: HttpClient) { }

  public getAllApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(this.apartmentUrl);
  }

  public getApartmentType(): Observable<ApartmentType[]> {
    return this.http.get<ApartmentType[]>(this.typeUrl);
  }

  public getAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(this.amenityUrl);
  }

  public createApartment(apartment: Apartment) {
    return this.http.post(this.apartmentUrl, apartment,
      {headers: new HttpHeaders({
          'Content-Type': 'application/json' }),
      responseType: 'text'
      })
      .pipe(tap(res => console.log('created apartments')
      ));
  }

}
