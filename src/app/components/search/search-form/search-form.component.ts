import { Component, OnInit } from '@angular/core';
import {CountryService} from '../../../services/country/coutry.service';
import {CityService} from '../../../services/city/city.service';
import {Country} from '../../../models/country';
import {City} from '../../../models/city';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  public numsOfGuests = [1, 2, 3, 4];
  public countries: Country[] = [];
  public cities: City[] = [];
  public selectedCountryId: number;
  public selectedCityId: number;
  public checkIn: string;
  public checkOut: string;
  public selectedNumberOfGuests: number;

  constructor(private countryService: CountryService,
              private cityService: CityService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.has('country')) {
      this.selectedCountryId = Number.parseInt(this.route.snapshot.queryParamMap.get('country'));
      this.initCities(this.selectedCountryId);
      if (this.route.snapshot.queryParamMap.has('city')) {
        this.selectedCityId = Number.parseInt(this.route.snapshot.queryParamMap.get('city'));
      }
    }
    if (this.route.snapshot.queryParamMap.has('checkin')) {
      this.checkIn = this.route.snapshot.queryParamMap.get('checkin');
    }
    if (this.route.snapshot.queryParamMap.has('checkout')) {
      this.checkOut = this.route.snapshot.queryParamMap.get('checkout');
    }
    if (this.route.snapshot.queryParamMap.has('num_of_guests')) {
      this.selectedNumberOfGuests = Number.parseInt(this.route.snapshot.queryParamMap.get('num_of_guests'));
    }
    this.initCountries();
  }
  public initCountries() {
    this.countryService.getCountry().subscribe(countries => {
      this.countries = countries;
    });
  }
  public initCities(CountryId: number) {
    this.cityService.getCity(CountryId).subscribe(cities => {
      this.cities = cities;
    });
  }
  public onCountrySelect(id: number) {
    this.selectedCountryId = id;
    this.initCities(id);
  }
  public onCitySelect(id: number) {
    this.selectedCityId = id;
  }
  public onNumOfGuestsSelect(numOfGuests: number) {
    this.selectedNumberOfGuests = numOfGuests;
  }
  public onSearch(searchForm) {
    this.router.navigate(['/advanced-search'], { queryParams:
        {
          country: this.selectedCountryId,
          city: this.selectedCityId,
          checkin: this.checkIn,
          checkout: this.checkOut,
          num_of_guests: this.selectedNumberOfGuests
        }});
  }
}
