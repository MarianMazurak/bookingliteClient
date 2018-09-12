import {Component, Input, OnInit} from '@angular/core';

import {Property} from '../../../models/property';
import {PropertyService} from '../../../services/property/property.service';
import {AuthService} from '../../../services/authentication/auth.service';
import {ReviewService} from '../../../services/review/review.service';
import {ApartmentService} from '../../../services/apartment/apartment.service';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css']
})
export class ListPropertyComponent implements OnInit {

  private authentication;

  @Input() propertyList: Property[];
  constructor(private propertyService: PropertyService,
              private reviewService: ReviewService,
              private apartmentService: ApartmentService,
              private auth: AuthService ) {}


  reviewCount: number;
  ngOnInit() {
    this.authentication = this.auth.isAuthenticated;
  }
 }
