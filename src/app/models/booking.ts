import {Apartment} from './apartment';
import {User} from './user';
import {Review} from './review';
import {BookingStatus} from './booking-status';


export class Booking {
  reviewDto: any;
  bookingId: number;
  apartment: Apartment;
  user: User;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  bookingStatus: BookingStatus;
  review: Review;
}
