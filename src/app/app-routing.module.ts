import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import {ListPropertyComponent} from './components/property/list-property/list-property.component';

import { CreatePropertyComponent } from './components/property/create-property/create-property.component';

import {ListApartmentComponent} from './components/apartment/list-apartment/list-apartment.component';
import {CreateApartmentComponent} from './components/apartment/create-apartment/create-apartment.component';
import {ListBookingComponent} from './components/booking/list-booking/list-booking.component';
import {BookingComponent} from './components/booking/booking.component';
import {CreateReviewComponent} from './components/review/create-review/create-review.component';
import {CreateBookingComponent} from './components/booking/create-booking/create-booking.component';
import {ReviewsListPropertyComponent} from './components/review/reviews-list-property/reviews-list-property.component';
import {ReviewBookingComponent} from './components/review/review-booking/review-booking.component';
import {GuestArrivalsComponent} from './components/booking/guest-arrivals/guest-arrivals.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'bookings', component: ListBookingComponent},
  {path: 'booking/:id', component: BookingComponent},
  {path: 'create-property', component: CreatePropertyComponent},
  {path: 'property-list', component: ListPropertyComponent},
  {path: 'apartment-list', component: ListApartmentComponent},
  {path: 'create-apartment', component: CreateApartmentComponent},
  {path: ' create-booking', component: CreateBookingComponent},
  {path: ' create-review', component: CreateReviewComponent},
  {path: ' reviews-list-property', component: ReviewsListPropertyComponent},
  {path: ' review-booking', component: ReviewBookingComponent},
  {path: 'guest-arrivals', component : GuestArrivalsComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule {
 }
