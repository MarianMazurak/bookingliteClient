import {Component, OnInit} from '@angular/core';
import {Property} from '../../models/property';
import {ActivatedRoute} from '@angular/router';
import {PropertyService} from '../../services/property/property.service';
import {City} from '../../models/city';
import {CountryService} from '../../services/country/coutry.service';
import {CityService} from '../../services/city/city.service';
import {Country} from '../../models/country';
import {FacilityService} from '../../services/facility/facility.service';
import {Facility} from '../../models/facility';
import {Amenity} from '../../models/amenity';
import {ApartmentService} from '../../services/apartment/apartment.service';

@Component ({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  propertyList: Property[];
  public countries: Country[] = [];
  public cities: City[] = [];
  public facilities: Facility[];
  public amenities: Amenity[];
  public amenitiesId: number[] = [];
  public facilitiesId: number[] = [];
  public checkedfacilities: boolean[];
  public selectedCountryId: number;
  public selectedCityId: number;
  public checkIn: string;
  public checkOut: string;
  public numberOfGuests: number;

  constructor(private propertyService: PropertyService,
              private apartmentService: ApartmentService,
              private route: ActivatedRoute,
              private countryService: CountryService,
              private cityService: CityService,
              private facilityService: FacilityService) {
  }

  ngOnInit() {
    this.getProperties();
    this.getCountries();
    this.getCountries();
    this.getFacilities();
    this.getAmenities();
  }

  public getProperties() {
    const countryId = +this.route.snapshot.paramMap.get('countryId');
    const cityId = +this.route.snapshot.paramMap.get('cityId');
    const checkIn = this.route.snapshot.paramMap.get('checkIn');
    const checkOut = this.route.snapshot.paramMap.get('checkOut');
    const numberOfGuests = +this.route.snapshot.paramMap.get('numberOfGuests');
    this.propertyService.search(countryId, cityId, checkIn, checkOut, numberOfGuests).subscribe(res =>
    this.propertyList = res);
  }

  public getCountries() {
    const countryId = +this.route.snapshot.paramMap.get('countryId');
    console.log(countryId, ' country id !!!!!!!!!!');
    this.countryService.getCountry().subscribe((countriesarr) => {
      this.countries = countriesarr;
      this.selectedCountryId = countryId;
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
    const cityId = +this.route.snapshot.paramMap.get('cityId');
    console.log(cityId, ' city id !!!!');
    this.cityService.getCity(countryId).subscribe((citiesarr) => {
      this.cities = citiesarr;
      if (citiesarr.length !== 0) {
        this.selectedCityId = cityId;
      }
    });
  }

  public getFacilities() {
    this.facilityService.getAllFacilities().subscribe(facility => {
      this.facilities = facility;
      console.log('Facility: ', facility);
    });
  }

  public getAmenities() {
    this.apartmentService.getAmenities().subscribe(amenity => {
      this.amenities = amenity;
      console.log('Amenities: ', amenity);
    });
  }

  public workWithCheckboxes(id: number) {
    const index = this.facilitiesId.indexOf(id);
    if (index !== -1) {
      this.facilitiesId.splice(index, 1);
      return;
    }
    this.facilitiesId.push(id);
    const newUrl: string = window.location.href + '/' + id;
    history.pushState(null, null, newUrl);
  }

}
