import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/authentication/auth.service';
import {PropertyService} from '../../services/property/property.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isLoading = false;
  user: User;
  myPropertyCount = 0;
  myApartmentCount = 0;
  isOwner: boolean;
  constructor(private auth: AuthService, private propertyService: PropertyService) { }

  ngOnInit() {
    this.isLoading = true;
    this.auth.getUserFromBackEnd().subscribe(user => {
      this.user = user;
      this.isLoading = false;
    }, error => this.isLoading = false );
    this.auth.isOwner.subscribe( isOwner => {
      this.isOwner = isOwner;
      if (isOwner) {
        this.propertyService.getOwnerProperties().subscribe( properties => {
          this.myPropertyCount = properties.length;
          let myApartmentCount = 0;
          properties.forEach(property => myApartmentCount += property.apartments.length );
          this.myApartmentCount = myApartmentCount; });
      }
    });
  }
}
