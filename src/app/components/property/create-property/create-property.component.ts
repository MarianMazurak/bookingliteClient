import { Component, OnInit } from '@angular/core';

import { Country } from '../../../models/country';
import { City } from '../../../models/city';
import {CoutryService} from '../../../services/country/coutry.service';
import {CityService} from '../../../services/city/city.service';
import { Property } from '../../../models/property';
import { PropertyService } from '../../../services/property/property.service';

@Component ({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent implements OnInit {

  public property: Property;
  public countries: Country[];
  public cities: City[];
  public selectedCountry: string;
  public selectedCiry: string;

  constructor(private countryService: CoutryService,private cityService: CityService) { }

  ngOnInit() {
  }

  public getCounti

}
