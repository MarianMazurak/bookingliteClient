import {Component, OnInit} from '@angular/core';
import {Property} from '../../../models/property';
import {PropertyService} from '../../../services/property/property.service';
import {ReviewService} from '../../../services/review/review.service';
import {ApartmentService} from '../../../services/apartment/apartment.service';
import {AuthService} from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-owner-properties',
  templateUrl: './owner-properties.component.html',
  styleUrls: ['./owner-properties.component.css']
})
export class OwnerPropertiesComponent implements OnInit {

  authentication;
  propertyList: Property[];

  constructor(private propertyService: PropertyService,
              private reviewService: ReviewService,
              private apartmentService: ApartmentService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.authentication = this.auth.isAuthenticated;
    this.getOwnerProperties();
  }

  getOwnerProperties(): void {
    this.propertyService.getOwnerProperties().subscribe(properties => {
      this.propertyList = properties;
    });
  }
}
