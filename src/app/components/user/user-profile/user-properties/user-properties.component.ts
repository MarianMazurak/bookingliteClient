import { Component, OnInit } from '@angular/core';

import {PropertyService} from '../../../../services/property/property.service';
import { AuthService } from '../../../../services/authentication/auth.service';
import { Property } from '../../../../models/property';

@Component({
  selector: 'app-user-properties',
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.css']
})
export class UserPropertiesComponent implements OnInit {

  public isLoading = false;
  private authentication;
  propertyList: Property[];

  constructor(private propertyService: PropertyService , private auth: AuthService) { }

  ngOnInit() {
    this.authentication = this.auth.isAuthenticated;
    this.getOwnerProperties();
  }

  public getOwnerProperties() {
    this.isLoading = true;
    this.propertyService.getOwnerProperties().subscribe(properties => {
      this.propertyList = properties;
      this.isLoading = false;
      },
      error => this.isLoading = false);
  }
}

