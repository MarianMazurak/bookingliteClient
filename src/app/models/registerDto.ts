import { Address } from './address';

export class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    owner: boolean;
    address: Address = new Address();
}
