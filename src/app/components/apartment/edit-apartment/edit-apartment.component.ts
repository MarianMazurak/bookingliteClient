import { Component, OnInit } from '@angular/core';
import {Apartment} from '../../../models/apartment';
import {ActivatedRoute, Router} from '@angular/router';
import {ApartmentService} from '../../../services/apartment/apartment.service';
import {ApartmentType} from '../../../models/apartment-type';
import {Amenity} from '../../../models/amenity';
import {CreateApartment} from '../../../models/create-apartment';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-apartment',
  templateUrl: './edit-apartment.component.html',
  styleUrls: ['./edit-apartment.component.css']
})
export class EditApartmentComponent implements OnInit {

  formValid = true;
  errorMessage = '';
  apartment: Apartment;
  apartmentTypes: ApartmentType[];
  amenities: Amenity[];
  apartmentUpdate: CreateApartment;
  public selectApartmentType: number;

  constructor(private route: ActivatedRoute,
              private apartmentService: ApartmentService,
              private router: Router) { }

  ngOnInit() {
    this.apartmentUpdate = new CreateApartment();
    this.getApartmentById();
    this.getAmenities();
    this.getApartmentTypes();
    this.apartmentUpdate.amenitiesId = [];
  }

  public getApartmentById(): Apartment {
    const apId = +this.route.snapshot.paramMap.get('apid');
    const pId = +this.route.snapshot.paramMap.get('pid');
    this.apartmentService.getApartmentById(2, apId).subscribe(res => this.apartment = res);
    return this.apartment;
  }

  public getApartmentTypes() {
    this.apartmentService.getApartmentType().subscribe(res => {
      this.apartmentTypes = res;
    });
  }
  changeApartmentTypes(id: number) {
    this.selectApartmentType = id;
  }
  public getAmenities() {
    this.apartmentService.getAmenities().subscribe(res => {
      this.amenities = res;
    });
  }
  public workWithCheckboxes(id: number) {
    const index = this.apartmentUpdate.amenitiesId.indexOf(id);
    if (index !== -1) {
      this.apartmentUpdate.amenitiesId.splice(index, 1);
      return;
    }
    this.apartmentUpdate.amenitiesId.push(id);
  }
  public updateApartment(createApartmentForm: FormGroup) {
    if (createApartmentForm.valid) {
      const id = +this.route.snapshot.paramMap.get('apid');
      this.apartmentUpdate.name = this.apartment.name;
      this.apartmentUpdate.price = this.apartment.price;
      this.apartmentUpdate.numberOfGuests = this.apartment.numberOfGuests;
      this.apartmentUpdate.apartmentTypeId = this.selectApartmentType;
      console.log(this);
      this.apartmentService.updateApartment(this.apartmentUpdate, id).subscribe(res => {
      this.onSubmit();
      }, error => {
        this.errorMessage = JSON.parse(error.error).message;
      });
    } else {
      this.formValid = false;
    }
  }
  onSubmit() {
    const id = +this.route.snapshot.paramMap.get('pid');
    this.router.navigate(['/myproperty/' + id + '/apartments']);
  }
}
