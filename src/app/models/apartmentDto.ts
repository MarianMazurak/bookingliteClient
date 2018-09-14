import {PropertyDto} from './propertyDto';
import {ApartmentType} from './apartment-type';
import {Amenity} from './amenity';

export class ApartmentDto {
  id: number;
  name: string;
  price: number;
  numberOfGuests: number;
  propertyDto: PropertyDto;
  apartmentType: ApartmentType;
  amenities: Amenity[];
}
