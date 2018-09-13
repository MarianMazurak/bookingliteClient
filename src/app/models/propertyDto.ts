import {UserDto} from './userDto';
import {PropertyType} from './property-type';
import {Address} from './address';
import {Facility} from './facility';
import {ApartmentDto} from './apartmentDto';
import {Photo} from './photo';

export class PropertyDto {
  id: number;
  name: string;
  description: string;
  rating: number;
  phoneNumber: string;
  contactEmail: string;
  user: UserDto;
  propertyType: PropertyType;
  address: Address;
  facilities: Facility[];
  apartments: ApartmentDto[];
  photos: Photo[];
}
