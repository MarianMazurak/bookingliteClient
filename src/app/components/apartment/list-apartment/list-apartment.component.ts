import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';
import {ApartmentService} from '../../../services/apartment/apartment.service';
import {Apartment} from '../../../models/apartment';
import {ActivatedRoute} from '@angular/router';
import {PropertyService} from '../../../services/property/property.service';
import {Property} from '../../../models/property';

@Component ({
  selector: 'app-list-apartment',
  templateUrl: './list-apartment.component.html',
  styleUrls: ['./list-apartment.component.css']
})
export class ListApartmentComponent implements OnInit {

  private authenticated;
  aprtmentsList: Apartment[];
  @Input() property: Property;
  public queryParams = {
    checkin: '',
    checkout: '',
    num_of_guests: ''
  }
  constructor(private apartmentService: ApartmentService,
              private propertyService: PropertyService,
              private auth: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getApartmentsByPropertyId();
    this.queryParams.checkin = this.route.snapshot.queryParamMap.get('checkin');
    this.queryParams.checkout = this.route.snapshot.queryParamMap.get('checkout');
    this.queryParams.num_of_guests = this.route.snapshot.queryParamMap.get('num_of_guests');
  }

  public getApartmentsByPropertyId() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getPropertyById(id).subscribe(pr => this.property = pr);
    this.apartmentService.getAllApartments(id).subscribe(ap => {
      this.aprtmentsList = ap;
    });
  }

}
