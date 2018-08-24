import { PropertyType } from './property-type';
import { Facility } from './facility';
import {Photo} from './photo';
import {Address} from './address';
import {Country} from './country';
import {City} from './city';

export class PropertyCreate {
  name: string;
description: string;
rating: number;
phoneNumber: string;
contactEmail: string;
address: Address;
city:City;
countryId:number;
propertyTypeId: number;
facilities: number[];
}
