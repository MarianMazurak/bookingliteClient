import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';
import {ActivatedRoute} from '@angular/router';
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
  private authenticated;
  booking: BookingCreate = new BookingCreate();
  apartment: Apartment;
  today: Date;
  formValid = true;
  errorMessage = '';

  constructor(private auth: AuthService,
              private bookingService: BookingService,
              private apartmentService: ApartmentService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.authenticated = this.auth.isAuthenticated;
    this.booking = new BookingCreate();
    this.today = new Date();
    this.getApartmentById();
  }

  createBooking(createBookingForm: FormGroup) {
    const id = +this.route.snapshot.paramMap.get('id');
    if (createBookingForm.valid) {
      this.bookingService.createBooking(this.booking, id).subscribe(res => {
        alert('booking created'); } , error => {
        this.errorMessage = JSON.parse(error.error).message;
      });
    } else {
      this.formValid = false;
    }
  }

  getApartmentById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.apartmentService.getApartmentById(id).subscribe(apart => {
      this.apartment = apart;
    });
  }
  calculate(checkIn, checkOut): number {
    if ((checkOut > checkIn) && checkOut != null && checkIn != null) {
      return (this.apartment.price * this.bookingService.calculateNumberOfDates(checkIn, checkOut));
    } else { return 0; }
  }
}
