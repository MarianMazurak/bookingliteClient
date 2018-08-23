import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Apartment} from '../../models/apartment';
import {tap} from 'rxjs/operators';
import {ApartmentType} from '../../models/apartment-type';
import {Amenity} from '../../models/amenity';
import {CreateApartment} from '../../models/create-apartment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  // private apartmentUrl = '/api/property/';
  private apartmentUrl = '/api/property/1/apartment';
  private typeUrl = '/api/create-apartment/apartment-type';
  private amenityUrl = '/api/create-apartment/amenities';

  constructor(private http: HttpClient) { }

  // public getAllApartments(propertyId: number): Observable<Apartment[]> {
  //   return this.http.get<Apartment[]>(`${this.apartmentUrl}${propertyId}/apartment`);
  // }

  public getAllApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(this.apartmentUrl);
  }

  public getAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(this.amenityUrl);
  }

  public getApartmentType(): Observable<ApartmentType[]> {
    return this.http.get<ApartmentType[]>(this.typeUrl);
  }

  public createApartment(createApartment: CreateApartment) {
    return this.http.post(this.apartmentUrl, createApartment,
      {headers: new HttpHeaders({
          'Content-Type': 'application/json' }),
      responseType: 'text'
      })
      .pipe(tap(res => console.log('created apartments')
      ));
  }

}
