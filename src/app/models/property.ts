import { PropertyType } from './property-type';
import { Facility } from './facility';
import {Photo} from './photo';
import {Apartment} from './apartment';

export class Property {
  id: number;
  name: string;
  description: string;
  rating: number;
  phoneNumber: string;
  contactEmail: string;
  propertyType: PropertyType;
  facilities: Facility[];
  photos: Photo[];
  apartments: Apartment[];
}
