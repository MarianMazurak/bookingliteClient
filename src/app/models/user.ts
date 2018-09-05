import { Role } from "./role";
import { Address } from "./address";

export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roles: Role[];
  //address: Address;
}
