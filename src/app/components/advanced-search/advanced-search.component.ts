import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Property} from '../../models/property';
import {Facility} from '../../models/facility';
import {Amenity} from '../../models/amenity';
import {PropertyService} from '../../services/property/property.service';
import {ApartmentService} from '../../services/apartment/apartment.service';
import {CountryService} from '../../services/country/coutry.service';
import {CityService} from '../../services/city/city.service';
import {FacilityService} from '../../services/facility/facility.service';
import { PaginationService } from '../../services/pagination/pagination.service';

@Component ({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {
  public NOT_SELECT_DATA_MESSAGE = 'Please, select country, city, checkin, checkout and number of guests';
  public isLoading = false;
  errorMsg: string;
  propertyList: Property[];
  public facilities: Facility[];
  public amenities: Amenity[];
  private DEFAULT_PRICE = 9999;
  public selectedPrice = this.DEFAULT_PRICE;
  public selectedCountryId: number;
  public selectedCityId: number;
  public checkIn: string;
  public checkOut: string;
  public selectedNumberOfGuests: number;
  public selectedFasilityIds: string[] = [];
  public selectedAmenityIds: string[] = [];

  public currentPage: number ;
  public selectedItemsSize: number = 5;
  public pagesToPagination : number [];
  public totalPages: number; 
  public totalElements: number;

  constructor(private propertyService: PropertyService,
              private apartmentService: ApartmentService,
              private route: ActivatedRoute,
              private countryService: CountryService,
              private cityService: CityService,
              private facilityService: FacilityService,
              private router: Router,
              private paginationService: PaginationService) {
  }

  public ngOnInit() {
    this.currentPage= 1;
    this.readMainData();
    this.readAdvancedData();
    if (this.selectedCountryId && this.selectedCityId && this.checkIn && this.checkOut && this.selectedNumberOfGuests) {
      if ((this.selectedFasilityIds.length !== 0) || (this.selectedAmenityIds.length !== 0) || this.selectedPrice !== this.DEFAULT_PRICE) {
        this.advancedSearch();
      } else {
        this.mainSearch();
      }
    } else {
      this.errorMsg = this.NOT_SELECT_DATA_MESSAGE;
    }
    this.getFacilities();
    this.getAmenities();     
  }

  public readMainData() {
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

  public readAdvancedData() {
    if (this.route.snapshot.queryParamMap.has('facilities')
      && (this.route.snapshot.queryParamMap.get('facilities').length !== 0)) {
      this.selectedFasilityIds = this.route.snapshot.queryParamMap.get('facilities').split(',');
    }
    if (this.route.snapshot.queryParamMap.has('amenities')
      && (this.route.snapshot.queryParamMap.get('amenities').length !== 0)) {
      this.selectedAmenityIds = this.route.snapshot.queryParamMap.get('amenities').split(',');
    }
    if (this.route.snapshot.queryParamMap.has('price')
      && (this.route.snapshot.queryParamMap.get('price').length !== 0)) {
      this.selectedPrice = Number.parseInt(this.route.snapshot.queryParamMap.get('price'));
    }
  }

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

  public onMainDataChange(newMainData) {
    this.resetData();
    this.selectedCountryId = newMainData.country;
    this.selectedCityId = newMainData.city;
    this.checkIn = newMainData.checkin;
    this.checkOut = newMainData.checkout;
    this.selectedNumberOfGuests = newMainData.num_of_guests;
    this.mainSearch();
  }

  public resetData() {
    this.errorMsg = null;
    this.propertyList = undefined;
    this.selectedCountryId = undefined;
    this.selectedCityId = undefined;
    this.checkIn = undefined;
    this.checkOut = undefined;
    this.selectedNumberOfGuests = undefined;
    this.selectedFasilityIds = [];
    this.selectedAmenityIds = [];
  }

  public onFacilitySelect(id: number) {
    const index = this.selectedFasilityIds.indexOf(id.toString());
    if (index !== -1) {
      this.selectedFasilityIds.splice(index, 1);
      return;
    }
    this.selectedFasilityIds.push(id.toString());
  }

  public onAmenitySelect(id: number) {
    const index = this.selectedAmenityIds.indexOf(id.toString());
    if (index !== -1) {
      this.selectedAmenityIds.splice(index, 1);
      return;
    }
    this.selectedAmenityIds.push(id.toString());
  }

  public onApply() {
    let facilitiesValue;
    if (this.selectedFasilityIds.length > 0) {
      facilitiesValue = this.selectedFasilityIds.join(',');
    }
    let amenitiesValue;
    if (this.selectedAmenityIds.length > 0) {
      amenitiesValue = this.selectedAmenityIds.join(',');
    }
    this.router.navigate(['/advanced-search'], { queryParams: {
        country: this.selectedCountryId,
        city: this.selectedCityId,
        checkin: this.checkIn,
        checkout: this.checkOut,
        num_of_guests: this.selectedNumberOfGuests,
        price: this.selectedPrice,
        facilities: facilitiesValue,
        amenities: amenitiesValue
      }});
    this.advancedSearch();
  }

  public mainSearch() {
    this.isLoading = true;
    this.propertyService.search(this.selectedCountryId, this.selectedCityId, this.checkIn, this.checkOut,
         this.selectedNumberOfGuests, this.currentPage -1, this.selectedItemsSize )
      .subscribe(data => {
        this.propertyList = data['content'];
        this.totalPages= data['totalPages'];
        this.totalElements=  data['totalElements'];
        this.pagesToPagination= this.paginationService.calculatePages(this.currentPage, this.totalPages);
        this.isLoading = false
        }, error => this.isLoading = false
      );
  }

  public advancedSearch() {
    this.isLoading = true;
      this.propertyService.advancedSearch(
        this.selectedCountryId,
        this.selectedCityId,
        this.checkIn,
        this.checkOut,
        this.selectedNumberOfGuests,
        this.selectedPrice,
        this.selectedFasilityIds,
        this.selectedAmenityIds, 
        this.currentPage -1, 
        this.selectedItemsSize).subscribe(data => {
          this.propertyList = data['content'];
          this.totalPages= data['totalPages'];
          this.totalElements=  data['totalElements'];
          this.pagesToPagination= this.paginationService.calculatePages(this.currentPage, this.totalPages);
          this.isLoading = false;
        }, error => this.isLoading = false
      );
  }

  goToPage(n: number): void {
    this.currentPage=n;  
    if(this.selectedFasilityIds.length == 0 && this.selectedAmenityIds.length == 0){
      this.mainSearch();
    }
    else this.advancedSearch();
  }

  onFirst(n: number): void {
    this.currentPage=n;    
    if(this.selectedFasilityIds.length == 0 && this.selectedAmenityIds.length == 0){
      this.mainSearch();
    }
    else this.advancedSearch();
  }

  onPrev(): void {
    this.currentPage--;  
    if(this.selectedFasilityIds.length == 0 && this.selectedAmenityIds.length == 0){
      this.mainSearch();
    }
    else this.advancedSearch();
}

  onNext(): void {    
    this.currentPage++;    
    if(this.selectedFasilityIds.length == 0 && this.selectedAmenityIds.length == 0){
      this.mainSearch();
    }
    else this.advancedSearch();
  }

  onLast(n: number): void {
    this.currentPage=n;  
    if(this.selectedFasilityIds.length == 0 && this.selectedAmenityIds.length == 0){
      this.mainSearch();
    }
    else this.advancedSearch();
  }

}
