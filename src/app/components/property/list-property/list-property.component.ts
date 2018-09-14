import {Component, Input, OnInit} from '@angular/core';

import {Property} from '../../../models/property';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css']
})
export class ListPropertyComponent implements OnInit {

  @Input() propertyList: Property[]
  public queryParams = {
    checkin: '',
    checkout: '',
    num_of_guests: ''
  }
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.queryParams.checkin = this.route.snapshot.queryParamMap.get('checkin');
    this.queryParams.checkout = this.route.snapshot.queryParamMap.get('checkout');
    this.queryParams.num_of_guests = this.route.snapshot.queryParamMap.get('num_of_guests');
  }
 }
