import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';
import {ApartmentService} from '../../../services/apartment/apartment.service';
import {Apartment} from '../../../models/apartment';

@Component ({
  selector: 'app-list-apartment',
  templateUrl: './list-apartment.component.html',
  styleUrls: ['./list-apartment.component.css']
})
export class ListApartmentComponent implements OnInit {

  private authenticated;
  aprtmentsList: Apartment[];

  constructor(private apartmentService: ApartmentService,
              private auth: AuthService ) { }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.getApartments();
  }

  public getApartments() {
    this.apartmentService.getAllApartments().subscribe(apartment => {
      this.aprtmentsList = apartment;
    });
  }

}
