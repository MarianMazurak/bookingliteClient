import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import {ListPropertyComponent} from './components/property/list-property/list-property.component';

import { CreatePropertyComponent } from './components/property/create-property/create-property.component';

import {ListApartmentComponent} from './components/apartment/list-apartment/list-apartment.component';
import {CreateApartmentComponent} from './components/apartment/create-apartment/create-apartment.component';
import { ListBookingComponent } from './components/booking/list-booking/list-booking.component';
import { BookingComponent } from './components/booking/booking.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'bookings', component: ListBookingComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'create-property', component: CreatePropertyComponent },
  { path: 'property', component: ListPropertyComponent},
  { path: 'property/:id', component: ListApartmentComponent},
  { path: 'create-apartment', component: CreateApartmentComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule {
 }
