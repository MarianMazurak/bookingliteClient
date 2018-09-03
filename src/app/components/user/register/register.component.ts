import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { RegisterDto } from '../../../models/registerDto';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country/coutry.service';
import { City } from '../../../models/city';
import { CityService } from '../../../services/city/city.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerDto: RegisterDto = new RegisterDto();
  countries: Country[];
  cities: City[];
  selectedCity: number;
  selectedCountry: number;
  formValid = true;
  errorMessage = '';
  constructor(private auth: AuthService, private countryService: CountryService, private cityService: CityService) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.countryService.getCountry().subscribe((countriesarr) => {
      this.countries = countriesarr;
      this.selectedCountry = countriesarr[0].id;
      this.getCities(this.selectedCountry);
    });
  }
  changeCountry(id: number) {
    this.selectedCountry = id;
    this.getCities(id);
  }
  changeCity(id: number) {
    this.selectedCity = id;
  }

  getCities(countryId: number) {
    this.cityService.getCity(countryId).subscribe((citiesarr) => {
      this.cities = citiesarr;
      if (citiesarr.length !== 0) {
      this.selectedCity = citiesarr[0].id;
      }
    });
  }
  signUp(registerForm: FormGroup) {
    if (registerForm.valid) {
    console.log(JSON.stringify(this.registerDto));
    this.registerDto.address.city.id = this.selectedCity;
    this.registerDto.address.city.country.id = this.selectedCountry;
    this.auth.signUp(this.registerDto).subscribe((result) => {
      console.log(result);
    }, error => {
      console.log(error);
      this.errorMessage = JSON.parse(error.error).message;
    });
    } else {
      this.formValid = false;
    }
  }

}
