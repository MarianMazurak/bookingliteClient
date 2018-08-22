import { Component, OnInit } from '@angular/core';
import {ApartmentType} from '../../../models/apartment-type';
import {Amenity} from '../../../models/amenity';
import {Apartment} from '../../../models/apartment';
import {ApartmentService} from '../../../services/apartment/apartment.service';
import {AuthService} from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-create-apartment',
  templateUrl: './create-apartment.component.html',
  styleUrls: ['./create-apartment.component.css']
})
export class CreateApartmentComponent implements OnInit {

  private authenticated;
  apartmentTypes: ApartmentType[];
  amenities: Amenity[];
  apartment: Apartment;

  constructor(private auth: AuthService,
    private apartmentService: ApartmentService
  ) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getApartmentType();
    this.getAmenities();
  }

  public getApartmentType() {
    this.apartmentService.getApartmentType().subscribe(type => {
      this.apartmentTypes = type;
      console.log('Apartment Tepes: ', type);
    });
  }

  public getAmenities() {
    this.apartmentService.getAmenities().subscribe(amenity => {
      this.amenities = amenity;
      console.log('Amenities: ', amenity);
    });
  }

  public createApartments() {
    this.apartmentService.createApartment(this.apartment);
  }

}
