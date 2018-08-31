import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';
import {CountryService} from '../../../services/country/coutry.service';
import {CityService} from '../../../services/city/city.service';
import {Country} from '../../../models/country';
import {City} from '../../../models/city';
import {PropertyService} from '../../../services/property/property.service';
import {Property} from '../../../models/property';

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
              private propertyService: PropertyService) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
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

  public mainSearch() {
    this.propertyService.search(this.selectedCountryId,
      this.selectedCityId,
      this.checkIn,
      this.checkOut,
      this.numberOfGuests).subscribe(res => {
        this.properties = res;
    });
    console.log('!!!!!!!!!',
      this.selectedCountryId,
      this.selectedCityId,
      this.checkIn,
      this.checkOut,
      this.numberOfGuests);
  }

}
