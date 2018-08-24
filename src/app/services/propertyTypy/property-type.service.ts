import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { PropertyType } from '../../models/property-type';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PropertyTypeService {

  constructor(private http: HttpClient) { }

  public getAllPropertyTypes(): Observable<PropertyType[]>{
    return this.http.get<PropertyType[]>("api/propertytype")
  }
}
