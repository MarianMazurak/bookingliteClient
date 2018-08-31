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
  searchName: string;
  aprtmentsList: Apartment[];
  @Input() property: Property;

  constructor(private apartmentService: ApartmentService,
              private propertyService: PropertyService,
              private auth: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getApartmentsByPropertyId();
  }

  public getApartmentsByPropertyId() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getPropertyById(id).subscribe(pr => this.property = pr);
    this.apartmentService.getAllApartments(id).subscribe(ap => {
      this.aprtmentsList = ap;
    });
  }

}
