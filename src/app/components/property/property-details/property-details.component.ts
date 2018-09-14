import { Component, OnInit } from '@angular/core';
import {Property} from '../../../models/property';
import {PropertyService} from '../../../services/property/property.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  property: Property;
  public queryParams = {
    checkin: '',
    checkout: '',
    num_of_guests: ''
  }
  constructor(private route: ActivatedRoute, private propertyService: PropertyService) { }

  ngOnInit() {
    this.getPropertyById();
    this.queryParams.checkin = this.route.snapshot.queryParamMap.get('checkin');
    this.queryParams.checkout = this.route.snapshot.queryParamMap.get('checkout');
    this.queryParams.num_of_guests = this.route.snapshot.queryParamMap.get('num_of_guests');
  }
  public getPropertyById(): Property {
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getPropertyById(id).subscribe(res => this.property = res);
    return this.property;
  }
}
