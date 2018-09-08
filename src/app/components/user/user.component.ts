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
  user: User;
  myPropertyCount = 0;
  myApartmentCount = 0;
  isOwner: boolean;
  constructor(private auth: AuthService, private propertyService: PropertyService) { }

  ngOnInit() {
    this.auth.getUserFromBackEnd().subscribe(user => {
      this.user = user;
    });
    this.auth.isOwner.subscribe( isOwner => {
      this.isOwner = isOwner;
      if (isOwner) {
        this.propertyService.getOwnerProperties().subscribe( properties => {
          console.log('property count:' + properties.length);
          this.myPropertyCount = properties.length;
          console.log('property count:' + this.myPropertyCount);
          let myApartmentCount = 0;
          properties.forEach(property => myApartmentCount += property.apartments.length );
          this.myApartmentCount = myApartmentCount; });
      }
    });
  }

}
