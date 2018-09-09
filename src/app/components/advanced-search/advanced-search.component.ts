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

  public arrayFacility: Array <number>;

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

  changeCheckBox(id: number){
    console.log("click on # ", id);
    // console.log("22222 ", window.location.href.split('/') [9]); //facilities (#ofGuest -8)
    //this.arrayFacility
    console.log("checkIfUrlHasFacilities() ", this.checkIfUrlHasFacilities(id));
   
    if( window.location.href.split('/') [9] && this.checkIfUrlHasFacilities(id) ){
      let facUrl: string =  window.location.href.split('/') [9] ;
      // console.log("length ", facUrl.split('&').length);
      let arrFac = new Array;
      console.log("newarray ", arrFac);
      let n: number = facUrl.split('&').length ; // we skip first argument ('facilities&')
      console.log("length uri fac ", n);
      let newurl: string;
      let facititiesUri: string= "facilities" +"&" ;
      console.log("facititiesUri start ", facititiesUri);
      console.log("current url ", window.location.href);

      for(let i=1; i<n; i++){ 
        console.log("symbol ", i, " = ", facUrl.split('&')[i]);
        console.log("symbol ", i, " = ", facUrl.split('&')[i], ", id=",id );
        if(Number(facUrl.split('&')[i]) !== id){
          if(i !== n-1){
            console.log("in if ");
            arrFac.push( Number(facUrl.split('&')[i]) );
            facititiesUri = facititiesUri + i + "&";
            console.log("facititiesUri if= ", i, " = ", facititiesUri);
          }
          else {
            console.log("in else ");
            arrFac.push( Number(facUrl.split('&')[i]) );
            facititiesUri = facititiesUri + i;
            console.log("facititiesUri else= ", i, " = ", facititiesUri);
          }          
        }         
      }
      console.log("array ", arrFac);
      console.log("facititiesUri= ", facititiesUri);
      this.arrayFacility= arrFac;
      newurl= window.location.protocol+ "//"
              +window.location.host +"/"
              +window.location.href.split('/')[3] +"/"
              +window.location.href.split('/')[4] +"/"
              +window.location.href.split('/')[5] +"/"
              +window.location.href.split('/')[6] +"/"
              +window.location.href.split('/')[7] +"/"
              +window.location.href.split('/')[8] +"/"
              + facititiesUri;
      history.pushState(null, null, newurl);
      
    }
    else{
      if( !window.location.href.split('/') [9]){
        // console.log("helooooooooo ");
        let newurl: string= window.location.href +"/"
        + "facilities" +"&" 
        + id ;
        history.pushState(null, null, newurl);
      }
      else{
        // console.log("helooooooooo2 ");
        let newurl: string= window.location.href +"&"+ id ;
        history.pushState(null, null, newurl);
      }
      
    }
  }

  checkIfUrlHasFacilities(id: number): boolean {
    // console.log("----------- ");
    let res: boolean =false;
    if( window.location.href.split('/') [9]){

      let facUrl: string =  window.location.href.split('/') [9] ;
      let n: number = facUrl.split('&').length;
      // console.log("length uri fac ", n);
      // console.log("current url ", window.location.href);      

      for(let i=1; i<n; i++){ //first we propuskaem
        // console.log("symbol ", i, " = ", facUrl.split('&')[i]);
        if( Number(facUrl.split('&')[i]) == id){
          res = true;
          // console.log("true ");
        }
      }
    }    
    // console.log("----------- ");
    return res;
  }  
}
