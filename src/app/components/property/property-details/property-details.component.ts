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

  constructor(private route: ActivatedRoute, private propertyService: PropertyService) { }

  ngOnInit() {
    this.getPropertyById();
  }
  public getPropertyById(): Property {
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getPropertyById(id).subscribe(res => this.property = res);
    return this.property;
  }
}
