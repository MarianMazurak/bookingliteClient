import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Route, Router} from '@angular/router';

// models
import { Country } from '../../../models/country';
import { City } from '../../../models/city';
import {PropertyType} from '../../../models/property-type';
import {PropertyCreate} from '../../../models/property-create';
import {Facility} from '../../../models/facility';

// services
import {CountryService} from '../../../services/country/coutry.service';
import {CityService} from '../../../services/city/city.service';
import { PropertyService } from '../../../services/property/property.service';
import {PropertyTypeService} from '../../../services/propertyTypy/property-type.service';
import {AuthService} from '../../../services/authentication/auth.service';
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
  public selectedPropertyTypeId: number;

  formValid = true;
  errorMessage = '';
  private authenticated;
  constructor(private auth: AuthService,
              private propertyService: PropertyService,
              private propertyTypeService: PropertyTypeService,
              private facilityService: FacilityService,
              private countryService: CountryService,
              private cityService: CityService,
              private router: Router) { }
  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.propertyCreate = new PropertyCreate();
    this.propertyCreate.facilityId = [];
    this.getFacilities();
    this.getPropertyTypes();
    this.getCountries();
  }
  getCountries() {
    this.countryService.getCountry().subscribe((countriesarr) => {
      this.countries = countriesarr;
      this.selectedCountryId = countriesarr[0].id;
      this.getCities(this.selectedCountryId);
    });
  }
  changeCountry(id: number) {
    this.selectedCountryId = id;
    this.getCities(id);
  }
  changeCity(id: number) {
    this.selectedCityId = id;
  }
  getCities(countryId: number) {
    this.cityService.getCity(countryId).subscribe((citiesarr) => {
      this.cities = citiesarr;
      if (citiesarr.length !== 0) {
        this.selectedCityId = citiesarr[0].id;
      }
    });
  }
  getPropertyTypes() {
    this.propertyTypeService.getAllPropertyTypes().subscribe((properties) => {
      this.propertyTypes = properties;
      this.selectedPropertyTypeId = properties[0].id;
    });
  }
  changePropertyTypes(id: number) {
    this.selectedPropertyTypeId = id;
  }
  public createProperty(createPropertyForm: FormGroup) {
    if (createPropertyForm.valid) {
      this.propertyCreate.countryId = this.selectedCountryId;
      this.propertyCreate.cityId = this.selectedCityId;
      this.propertyCreate.propertyTypeId = this.selectedPropertyTypeId;
      this.propertyService.createProperty(this.propertyCreate).subscribe(res => {
        this.onSubmit();
        }, error => {
         this.errorMessage = JSON.parse(error.error).message;
        });
    } else {
      this.formValid = false;
    }
  }
  public getFacilities() {
    this.facilityService.getAllFacilities().subscribe(facility => {
      this.facilities = facility;
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
  onSubmit() {
    this.router.navigate(['/myproperties']);
  }
}
