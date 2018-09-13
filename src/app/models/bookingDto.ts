import {ApartmentDto} from './apartmentDto';
import {UserDto} from './userDto';
import {BookingStatus} from './booking-status';
import {ReviewDto} from './reviewDto';

export class BookingDto {
  bookingId: number;
  apartmentDto: ApartmentDto;
  userDto: UserDto;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  bookingStatus: BookingStatus;
  reviewDto: ReviewDto;
}
