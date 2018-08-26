import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

// import { Property } from '../../models/property-create';
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
    console.log(model, '222222222222222222222222222');
    return this.http.post('api/testversion', model, httpOptions);
  }

  public getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>('api/property');
  }

  public getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>('api/property/' + id);

  }
}
