
import {Component, OnInit} from '@angular/core';
import {Property} from '../../models/property';
import {ActivatedRoute} from '@angular/router';
import {PropertyService} from '../../services/property/property.service';
import {CountryService} from '../../services/country/coutry.service';
import {CityService} from '../../services/city/city.service';
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
  errorMsg: string;
  propertyList: Property[];
  public facilities: Facility[];
  public amenities: Amenity[];
  public selectedCountryId: number;
  public selectedCityId: number;
  public checkIn: string;
  public checkOut: string;
  public selectedNumberOfGuests: number;

  constructor(private propertyService: PropertyService,
              private apartmentService: ApartmentService,
              private route: ActivatedRoute,
              private countryService: CountryService,
              private cityService: CityService,
              private facilityService: FacilityService) {
  }

  public ngOnInit() {
    this.errorMsg = undefined;
    console.log('hello', this.selectedNumberOfGuests);
    this.readMainSalectedData();
    if (this.selectedCountryId && this.selectedCityId && this.checkIn && this.checkOut && this.selectedNumberOfGuests) {
      this.mainSearch();
    } else {
      this.errorMsg = 'Please, select country, city, checkin, checkout and number of guests';
    }
    this.getFacilities();
    this.getAmenities();
  }
  public readMainSalectedData() {
    if (this.route.snapshot.queryParamMap.has('country')) {
      this.selectedCountryId = Number.parseInt(this.route.snapshot.queryParamMap.get('country'));
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
  }
  public mainSearch() {
    this.propertyService.search(this.selectedCountryId, this.selectedCityId, this.checkIn, this.checkOut, this.selectedNumberOfGuests)
      .subscribe(properties => {
        this.propertyList = properties;
        console.log(properties);
      });
  }

  /*public getCountries() {
    const countryId = +this.route.snapshot.paramMap.get('countryId');
    console.log(countryId, ' country id !!!!!!!!!!');
    this.countryService.getCountry().subscribe((countriesarr) => {
      this.countries = countriesarr;
      this.selectedCountryId = countryId;
      this.getCities(this.selectedCountryId);
    });
  }*/

  /*public changeCountry(id: number) {
    this.selectedCountryId = id;
    this.getCities(id);
  }*/

  /*public changeCity(id: number) {
    this.selectedCityId = id;
  }*/

  /*public getCities(countryId: number) {
    const cityId = +this.route.snapshot.paramMap.get('cityId');
    console.log(cityId, ' city id !!!!');
    this.cityService.getCity(countryId).subscribe((citiesarr) => {
      this.cities = citiesarr;
      if (citiesarr.length !== 0) {
        this.selectedCityId = cityId;
      }
    });
  }*/

  public getFacilities() {
    this.facilityService.getAllFacilities().subscribe(facility => {
      this.facilities = facility;
    });
  }

  public getAmenities() {
    this.apartmentService.getAmenities().subscribe(amenity => {
      this.amenities = amenity;
    });
  }

  /*public workWithCheckboxes(id: number) {
    const index = this.facilitiesId.indexOf(id);
    if (index !== -1) {
      this.facilitiesId.splice(index, 1);
      return;
    }
    this.facilitiesId.push(id);
    const newUrl: string = window.location.href + '/' + id;
    history.pushState(null, null, newUrl);
  }*/

  /*changeCheckBoxFacilities(id: number) {
    if ( window.location.href.split('/') [9] && this.checkIfUrlHasFacilities(id) ) {
      let facilityUrl: string =  window.location.href.split('/') [9] ;
      let arrFac = new Array;
      let n: number = facilityUrl.split('&').length ; // we skip first argument ('facilities&')
      let newurl: string;
      let facititiesUri: string = "facilities" ;
      for (let i = 1; i < n; i++) {
        if (Number(facilityUrl.split('&')[i]) !== id) {
            arrFac.push( Number(facilityUrl.split('&')[i]) );
            facititiesUri = facititiesUri + "&" + facilityUrl.split('&')[i] ;
        }
      }
      this.arrayFacilities = arrFac;
      newurl = this.baseUrlToFacilitiesAndAmenities
            + facititiesUri+"/"
            + window.location.href.split('/')[10];
      history.pushState(null, null, newurl);

    }
    else{
      if( window.location.href.split('/') [9] == "facilities"){ // add new facilities to url (if first case)
        let newurl: string = this.baseUrlToFacilitiesAndAmenities
                              + "facilities" +"&"  + id  +"/"
                              + window.location.href.split('/')[10];
        history.pushState(null, null, newurl);
      }
      else{// if url has facilities we only add new
        let newurl: string = this.baseUrlToFacilitiesAndAmenities
                            +window.location.href.split('/')[9] +"&" + id  +"/"
                            +window.location.href.split('/')[10];
        history.pushState(null, null, newurl);
      }
    }
  }*/

  /*checkIfUrlHasFacilities(id: number): boolean {//if has, we need delete his (0n click->check out checkBox)
    let result: boolean =false;
    if( window.location.href.split('/') [9]){
      let facilityUrl: string =  window.location.href.split('/') [9] ;
      let n: number = facilityUrl.split('&').length;
      for(let i=1; i<n; i++){
        if( Number(facilityUrl.split('&')[i]) == id){
          result = true;
        }
      }
    }
    return result;
  } */


  /*changeCheckBoxAmenities(id: number){
    if( window.location.href.split('/') [10] && this.checkIfUrlHasAmenities(id) ){
      let amenitiesUrl: string =  window.location.href.split('/') [10] ;
      let arrAm = new Array;
      let n: number = amenitiesUrl.split('&').length ; // we skip first argument ('amenities&')
      let newurl: string;
      let amenitiesUri: string= "amenities" ;
      for(let i=1; i<n; i++){
        if(Number(amenitiesUrl.split('&')[i]) !== id){
            arrAm.push( Number(amenitiesUrl.split('&')[i]) );
            amenitiesUri = amenitiesUri + "&" + amenitiesUrl.split('&')[i] ;
        }
      }
      this.arrayAmenities= arrAm;
      newurl= this.baseUrlToFacilitiesAndAmenities
              +window.location.href.split('/')[9] +"/"
              +amenitiesUri;
      history.pushState(null, null, newurl);
    }
    else{
      if( window.location.href.split('/') [10] == "amenities"){// add new amenities to url (if first case)
        let newurl: string = this.baseUrlToFacilitiesAndAmenities
                              +window.location.href.split('/')[9] +"/"
                              +"amenities" +"&"  + id  ;
        history.pushState(null, null, newurl);
      }
      else{// if url has amenities we only add new
        let newurl: string = this.baseUrlToFacilitiesAndAmenities
                              +window.location.href.split('/')[9] +"/"
                              + window.location.href.split('/')[10] +"&" + id;
        history.pushState(null, null, newurl);
      }
    }
  }*/

  /*checkIfUrlHasAmenities(id: number): boolean {//if has, we need delete his (0n click->check out checkBox)
    let result: boolean =false;
    if( window.location.href.split('/') [10]){
      let amUrl: string =  window.location.href.split('/') [10] ;
      let n: number = amUrl.split('&').length;
      for(let i=1; i<n; i++){
        if( Number(amUrl.split('&')[i]) == id){
          result = true;
        }
      }
    }
    return result;
  }  */
}
