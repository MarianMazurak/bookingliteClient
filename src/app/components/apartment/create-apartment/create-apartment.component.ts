import { Component, OnInit } from '@angular/core';
import {ApartmentType} from '../../../models/apartment-type';
import {Amenity} from '../../../models/amenity';
import {Apartment} from '../../../models/apartment';
import {ApartmentService} from '../../../services/apartment/apartment.service';
import {AuthService} from '../../../services/authentication/auth.service';
import {CreateApartment} from '../../../models/create-apartment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-apartment',
  templateUrl: './create-apartment.component.html',
  styleUrls: ['./create-apartment.component.css']
})
export class CreateApartmentComponent implements OnInit {

  private authenticated;
  apartmentTypes: ApartmentType[];
  amenities: Amenity[];
  createdApartment: CreateApartment;
  public selectedTypeId: number;

  constructor(private auth: AuthService,
              private apartmentService: ApartmentService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getApartmentType();
    this.getAmenities();
    this.createdApartment = new CreateApartment();
    this.createdApartment.amenitiesId = [];
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
    const id = +this.route.snapshot.paramMap.get('id');
    this.apartmentService.createApartment(this.createdApartment, id).subscribe(res => {
      alert('Apartment created');
    });
  }

  public workWithCheckboxes(id: number) {
    const index = this.createdApartment.amenitiesId.indexOf(id);
    if (index !== -1) {
      this.createdApartment.amenitiesId.splice(index, 1);
      return;
    }
    this.createdApartment.amenitiesId.push(id);
  }

}
