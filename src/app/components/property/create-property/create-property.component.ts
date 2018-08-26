import { Component, OnInit } from '@angular/core';

import { Country } from '../../../models/country';
import { City } from '../../../models/city';
import {CountryService} from '../../../services/country/coutry.service';
import {CityService} from '../../../services/city/city.service';
import {PropertyCreate} from '../../../models/property-create';
import { PropertyService } from '../../../services/property/property.service';
import {PropertyTypeService} from '../../../services/propertyTypy/property-type.service';
import {PropertyType} from '../../../models/property-type';
import {AuthService} from '../../../services/authentication/auth.service';

@Component ({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent implements OnInit {

  public propertyCreate: PropertyCreate;
  public countries: Country[];
  public cities: City[];
  public propertyTypes: PropertyType[];
  public selectedCityId: number;
  public selectedPropertyTypeId: number;
  private authenticated;

  constructor(private auth: AuthService, private countryService: CountryService, private cityService: CityService,
              private propertyService: PropertyService, private propertyTypeService: PropertyTypeService) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.propertyCreate = new PropertyCreate();
    this.getCountries();
    this.getPropertyTypes();
  }

  public getCountries(){
    this.countryService.getCountry().subscribe(res => {
      this.countries = res;
      alert("pk");
    })
  }

  public getCities(countryId: number){
    this.cityService.getCity(countryId).subscribe(res => {
      this.cities = res;
    })
  }

  public getPropertyTypes(){
    this.propertyTypeService.getAllPropertyTypes().subscribe(res => {
      this.propertyTypes = res;
    })
  }

  public createProperty(){
    this.propertyService.createProperty(this.propertyCreate).subscribe(res => {
      alert("Property created")
    });


  }
  public getId(){
    alert(this.selectedPropertyTypeId);
  }
}
