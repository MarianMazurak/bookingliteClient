import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../../services/authentication/auth.service';
import {Property} from '../../../models/property';
import {PropertyService} from '../../../services/property/property.service';
import {PropertyTypeService} from '../../../services/propertyTypy/property-type.service';
import {PropertyType} from '../../../models/property-type';
import { FacilityService } from '../../../services/facility/facility.service';
import {Facility} from '../../../models/facility';
import {FormGroup} from '@angular/forms';
import {PropertyCreate} from '../../../models/property-create';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

  formValid = true;
  errorMessage = '';
  private authentication;
  property: Property;
  propertyTypes: PropertyType[];
  public facilities: Facility[];
  public propertyUpdate: PropertyCreate;
  public selectedPropertyTypeId: number;

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private propertyService: PropertyService,
              private propertyTypeService: PropertyTypeService,
              private facilityService: FacilityService,
              private router: Router) { }

  ngOnInit() {
    this.authentication = this.auth.isAuthenticated;
    this.propertyUpdate = new PropertyCreate();
    this.getPropertyById();
    this.getPropertyTypes();
    this.propertyUpdate.facilityId = [];
    this.getFacilities();
    this.selectedPropertyTypeId = 1;
  }
  public getPropertyById() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getPropertyById(id).subscribe(res => this.property = res);
  }
  public getPropertyTypes() {
    this.propertyTypeService.getAllPropertyTypes().subscribe(res => {
      this.propertyTypes = res;
    });
  }
    changePropertyTypes(id: number) {
      this.selectedPropertyTypeId = id;
  }

  public updateProperty(createPropertyForm: FormGroup) {
    console.log(createPropertyForm.valid);
    if (createPropertyForm.valid) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.propertyUpdate.propertyTypeId = this.selectedPropertyTypeId;
      this.propertyUpdate.name = this.property.name;
      this.propertyUpdate.description = this.property.description;
      this.propertyUpdate.contactEmail = this.property.contactEmail;
      this.propertyUpdate.phoneNumber = this.property.phoneNumber;
      this.propertyService.updateProperty(this.propertyUpdate, id).subscribe(res => {
         this.onSubmit();
      }, error => {
        this.errorMessage = JSON.parse(error.error).message;
      });
       } else {
      this.formValid = false;
    }
  }
  public getFacilities() {
    this.facilityService.getAllFacilities().subscribe(facility => {
      this.facilities = facility;
      console.log('Facility: ', facility);
    });
  }
  public workWithCheckboxes(id: number) {
    const index = this.propertyUpdate.facilityId.indexOf(id);
    if (index !== -1) {
      this.propertyUpdate.facilityId.splice(index, 1);
      return;
    }
    this.propertyUpdate.facilityId.push(id);
  }
  onSubmit() {
    this.router.navigate(['/myproperties']);
  }
}
