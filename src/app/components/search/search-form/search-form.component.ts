import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';
import {CountryService} from '../../../services/country/coutry.service';
import {CityService} from '../../../services/city/city.service';
import {Country} from '../../../models/country';
import {City} from '../../../models/city';
import {PropertyService} from '../../../services/property/property.service';
import {Property} from '../../../models/property';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  private authenticated;
  public properties: Property[] = [];
  public countries: Country[] = [];
  public cities: City[] = [];
  public selectedCountryId: number;
  public selectedCityId: number;
  public checkIn: string;
  public checkOut: string;
  public numberOfGuests: number;

  constructor(private auth: AuthService,
              private countryService: CountryService,
              private cityService: CityService,
              public propertyService: PropertyService) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getCountries();
  }

  public mainSearch() {
    this.propertyService.search(this.selectedCountryId,
      this.selectedCityId,
      this.checkIn,
      this.checkOut,
      this.numberOfGuests).subscribe(res => {
        this.properties = res;
    });
  }

  public getCountries() {
    this.countryService.getCountry().subscribe((countriesarr) => {
      this.countries = countriesarr;
      this.selectedCountryId = countriesarr[0].id;  // !!!!!!!!!!!
      this.getCities(this.selectedCountryId);
    });
  }

  public changeCountry(id: number) {
    this.selectedCountryId = id;
    this.getCities(id);
  }

  public changeCity(id: number) {
    this.selectedCityId = id;
  }

  public getCities(countryId: number) {
    this.cityService.getCity(countryId).subscribe((citiesarr) => {
      this.cities = citiesarr;
      if (citiesarr.length !== 0) {
        this.selectedCityId = citiesarr[0].id;
      }
    });
  }

}
