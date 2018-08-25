import { Component, OnInit } from '@angular/core';

import { Property } from '../../../../models/property';
import { PropertyService } from '../../../../services/property/property.service';

@Component ({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.css']
})
export class PropertyItemComponent implements OnInit {

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
  }

}
