import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Property} from '../../models/property';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }


  public getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>('api/property');
  }

  public getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>('api/property/' + id);
  }
}
