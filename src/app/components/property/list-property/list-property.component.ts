import {Component, Input, OnInit} from '@angular/core';

import {Property} from '../../../models/property';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css']
})
export class ListPropertyComponent implements OnInit {
  @Input()
  propertyList: Property[];

  constructor() {}

  ngOnInit() {}

}
