import {ApartmentType} from './apartment-type';
import {Amenity} from './amenity';
import {Property} from './property';

export class Apartment {
  id: number;
  name: string;
  price: number;
  numberOfGuests: number;
  apartmentType: ApartmentType;
  amenities: Amenity[];
  property: Property;
}

