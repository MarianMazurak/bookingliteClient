import {Address} from './address';
import {Role} from './role';

export class UserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
  roles: Role[];
}
