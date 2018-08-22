import { Component } from '@angular/core';
import {PropertyService} from './services/property/property.service';
import {Property} from './models/property';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookingliteClient';
  constructor() {}
}
