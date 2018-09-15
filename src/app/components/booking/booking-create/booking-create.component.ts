import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookingService} from '../../../services/booking/booking.service';
import {Apartment} from '../../../models/apartment';
import {ApartmentService} from '../../../services/apartment/apartment.service';
import {BookingCreate} from '../../../models/booking-create';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.css']
})
export class BookingCreateComponent implements OnInit {
  booking: BookingCreate = new BookingCreate();
  apartment: Apartment;
  today: Date;
  formValid = true;
  errorMessage = '';
  flag: boolean;

  constructor(private bookingService: BookingService,
              private apartmentService: ApartmentService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.booking = new BookingCreate();
    this.today = new Date();
    this.getApartmentById();
    this.activatedRoute.queryParams.subscribe(params => {
      this.booking.checkIn = params['checkin'];
      this.booking.checkOut = params['checkout'];
      this.booking.numberOfGuests = params['num_of_guests'];
    });
  }
   onSubmit() {
     this.router.navigate(['/bookings/allBookings/1']);
   }

  createBooking(createBookingForm: FormGroup) {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (createBookingForm.valid) {
      this.bookingService.createBooking(this.booking, id).subscribe(res => {
        this.onSubmit();
      }, error => {
        this.errorMessage = JSON.parse(error.error).message;
      });
    } else {
      this.formValid = false;
    }
  }

  getApartmentById(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.apartmentService.getApartmentByIdApartment(id).subscribe(apart => {
      this.apartment = apart;
    });
  }

  calculateTotalDays(checkIn, checkOut): number {
    if (this.bookingService.calculateNumberOfDates(checkIn, checkOut) > 0) {
      return this.bookingService.calculateNumberOfDates(checkIn, checkOut);
    } else { return 0; }
  }

  calculatePriceByDates(checkIn, checkOut): number {
    if ((checkOut > checkIn) && checkOut != null && checkIn != null) {
      return (this.apartment.price * this.bookingService.calculateNumberOfDates(checkIn, checkOut));
    } else {
      return 0;
    }
  }
}
