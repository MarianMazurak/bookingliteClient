import {UserDto} from './userDto';

export class ReviewDto {
  id: number;
  message: string;
  rating: number;
  userDto: UserDto;
}
