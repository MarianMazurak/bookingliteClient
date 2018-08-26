import { Component, OnInit } from '@angular/core';

// models
import { Country } from '../../../models/country';
import { City } from '../../../models/city';
import {PropertyType} from '../../../models/property-type';
import {PropertyCreate} from '../../../models/property-create';

// services
import {CountryService} from '../../../services/country/coutry.service';
import {CityService} from '../../../services/city/city.service';
import { PropertyService } from '../../../services/property/property.service';
import {PropertyTypeService} from '../../../services/propertyTypy/property-type.service';
import {AuthService} from '../../../services/authentication/auth.service';
import {Facility} from '../../../models/facility';
import {FacilityService} from '../../../services/facility/facility.service';

@Component ({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent implements OnInit {

  public propertyCreate: PropertyCreate;
  public propertyTypes: PropertyType[];
  public countries: Country[] = [];
  public cities: City[] = [];
  public facilities: Facility[];
  public selectedCountryId: number;
  public selectedCityId: number;
  private authenticated;

  constructor(private auth: AuthService,
              private propertyService: PropertyService,
              private propertyTypeService: PropertyTypeService,
              private facilityService: FacilityService,
              private countryService: CountryService,
              private cityService: CityService) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.propertyCreate = new PropertyCreate();
    this.propertyCreate.facilityId = [];
    this.getFacilities();
    this.getPropertyTypes();
    this.getCountries();
    this.getCities(this.selectedCountryId);
  }

  public getCountries() {
    this.countryService.getCountry().subscribe(res => {
      this.countries = res;
    });
  }

  public getCities(id: number) {
    this.cityService.getCity(this.selectedCountryId).subscribe(res => {
      this.cities = res;
    });
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

  public getFacilities() {
    this.facilityService.getAllFacilities().subscribe(facility => {
      this.facilities = facility;
      console.log('Facility: ', facility);
    });
  }

  public workWithCheckboxes(id: number) {
    const index = this.propertyCreate.facilityId.indexOf(id);
    if (index !== -1) {
      this.propertyCreate.facilityId.splice(index, 1);
      return;
    }
    this.propertyCreate.facilityId.push(id);
  }
}
