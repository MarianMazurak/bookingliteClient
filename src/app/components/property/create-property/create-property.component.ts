import { Component, OnInit } from '@angular/core';

import { Country } from '../../../models/country';
import { City } from '../../../models/city';
import {CoutryService} from '../../../services/country/coutry.service';
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


  public selectedCountryId: number;

  public propertyCreate: PropertyCreate;
  public countries: Country[];
  public cities: City[];
  public propertyTypes: PropertyType[];
     private authenticated;

  constructor(private auth: AuthService, private countryService: CoutryService, private cityService: CityService,
              private propertyService: PropertyService, private propertyTypeService: PropertyTypeService) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.propertyCreate = new PropertyCreate();
    this.getCountries();
    // this.getCities();
    this.getPropertyTypes();
    this.selectedCountryId = 0;
  }

  public getCountries() {
    this.countryService.getCountry().subscribe(res => {
      this.countries = res;
      this.showCountry();
    });
  }

  public getCities(id: number) {
    console.log(this.selectedCountryId, 'countrysdaiddd');
    this.cityService.getCity(id).subscribe(res => {
        this.cities = res;
    });
  }

  public showCountry() {
    console.log(this.selectedCountryId, '@@!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }

  public getPropertyTypes() {
    this.propertyTypeService.getAllPropertyTypes().subscribe(res => {
      this.propertyTypes = res;
    });
  }

  public createProperty() {
    this.propertyService.createProperty(this.propertyCreate).subscribe(res => {
      alert('Property created');
    });


  }

  onSelectedCountryId(id: number) {
    this.customFunction(id);
  }

  customFunction(id: number) {
    this.selectedCountryId = id;
  }

   public saveCountryId(id: number) {
    this.selectedCountryId = id;
   }
 }
