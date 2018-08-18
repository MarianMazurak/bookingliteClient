import {ApartmentType} from './apartment-type';
import {Amenity} from './amenity';

export class Apartment {
  id: number;
  name: string;
  price: number;
  numberOfGuests: number;
  apartmentType: ApartmentType;
  amenities: Amenity[];
}

