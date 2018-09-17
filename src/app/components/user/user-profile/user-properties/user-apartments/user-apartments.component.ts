import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PropertyService} from '../../../../../services/property/property.service';
import {Property} from '../../../../../models/property';

@Component({
  selector: 'app-user-apartments',
  templateUrl: './user-apartments.component.html',
  styleUrls: ['./user-apartments.component.css']
})
export class UserApartmentsComponent implements OnInit {

  public isLoading = false;
  property: Property;
  constructor(private route: ActivatedRoute, private propertyService: PropertyService) { }
  ngOnInit() {
    this.isLoading = true;
    this.propertyService.getPropertyById(Number.parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe(property => {
        this.property = property;
        this.isLoading = false;
      },
        error => this.isLoading = false);
  }
}
