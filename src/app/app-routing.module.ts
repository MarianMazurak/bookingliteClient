import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ListPropertyComponent} from './components/property/list-property/list-property.component';
import {CreatePropertyComponent} from './components/property/create-property/create-property.component';
import {ListApartmentComponent} from './components/apartment/list-apartment/list-apartment.component';
import {CreateApartmentComponent} from './components/apartment/create-apartment/create-apartment.component';
import {SearchComponent} from './components/search/search.component';
import {EditPropertyComponent} from './components/property/edit-property/edit-property.component';
import {PropertyComponent} from './components/property/property.component';
import {ListBookingComponent} from './components/booking/list-booking/list-booking.component';
import {BookingComponent} from './components/booking/booking.component';
import {ReviewBookingComponent} from './components/review/review-booking/review-booking.component';
import {ReviewCreateComponent} from './components/review/review-create/review-create.component';
import {BookingCreateComponent} from './components/booking/booking-create/booking-create.component';
import {ReviewComponent} from './components/review/review.component';
import {OwnerPropertiesComponent} from './components/property/owner-properties/owner-properties.component';
import {GuestArrivalsComponent} from './components/booking/guest-arrivals/guest-arrivals.component';
import {UserComponent} from './components/user/user.component';
import {UserPropertiesComponent} from './components/user/user-profile/user-properties/user-properties.component';
import {UserApartmentsComponent} from './components/user/user-profile/user-properties/user-apartments/user-apartments.component';
import {AuthGuardService} from './services/authentication/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'bookings/:filter', component: ListBookingComponent },
  {path: 'booking/:id', component: BookingComponent},
  {path: 'create-property', component: CreatePropertyComponent},
  {path: 'create-apartment', component: CreateApartmentComponent},
  {path: 'property', component: ListPropertyComponent},
  {path: 'property/:id', component: ListApartmentComponent},
  {path: 'apartment-list', component: ListApartmentComponent},
  {path: 'property/:id/apartment', component: CreateApartmentComponent},
  {path: 'search', component: SearchComponent},
  {path: 'edit-property/:id', component: EditPropertyComponent},
  {path: 'property-detailes/:id', component: PropertyComponent},
  {path: 'review-booking/:id', component: ReviewBookingComponent},
  {path: 'review-create/:id', component: ReviewCreateComponent},
  {path: 'booking-create/:id', component: BookingCreateComponent},
  {path: 'property/:id/reviews', component: ReviewComponent},
  {path: 'owner-properties', component: OwnerPropertiesComponent},
  {path: 'guest-arrivals/:id', component: GuestArrivalsComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuardService]},
  {path: 'myproperties', component: UserPropertiesComponent},
  {path: 'property/:id/apartments', component: UserApartmentsComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
