import { Component, OnInit } from '@angular/core';
import {ApartmentType} from '../../../models/apartment-type';
import {Amenity} from '../../../models/amenity';
import {ApartmentService} from '../../../services/apartment/apartment.service';
import {AuthService} from '../../../services/authentication/auth.service';
import {CreateApartment} from '../../../models/create-apartment';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

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
  formValid = true;
  errorMessage = '';

  constructor(private auth: AuthService,
              private apartmentService: ApartmentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getApartmentTypes();
    this.getAmenities();
    this.createdApartment = new CreateApartment();
    this.createdApartment.amenitiesId = [];
  }
  getApartmentTypes() {
    this.apartmentService.getApartmentType().subscribe((apType) => {
      this.apartmentTypes = apType;
      this.selectedTypeId = this.apartmentTypes[0].id;
    });
  }
  changeApartmentType(id: number) {
    this.selectedTypeId = id;
  }
  public getAmenities() {
    this.apartmentService.getAmenities().subscribe(amenity => {
      this.amenities = amenity;
    });
  }
  public createApartment(createApartmentForm: FormGroup) {
    if (createApartmentForm.valid) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.createdApartment.apartmentTypeId = this.selectedTypeId;
    this.apartmentService.createApartment(this.createdApartment, id).subscribe(res => {
      this.onSubmit();
      }, error => {
      this.errorMessage = JSON.parse(error.error).message;
    });
    } else {
      this.formValid = false;
    }
  }
  public workWithCheckboxes(id: number) {
    const index = this.createdApartment.amenitiesId.indexOf(id);
    if (index !== -1) {
      this.createdApartment.amenitiesId.splice(index, 1);
      return;
    }
    this.createdApartment.amenitiesId.push(id);
  }
  onSubmit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/myproperty/' + id + '/apartments']);
  }
}
