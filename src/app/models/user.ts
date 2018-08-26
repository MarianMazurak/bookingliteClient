import { Role } from "./role";
import { Address } from "./address";

export class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  roles: Role[];
  address: Address;
}
