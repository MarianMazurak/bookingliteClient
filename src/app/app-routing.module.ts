import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import {ListPropertyComponent} from './components/property/list-property/list-property.component';

import { CreatePropertyComponent } from './components/property/create-property/create-property.component';

import {ListApartmentComponent} from './components/apartment/list-apartment/list-apartment.component';
import {CreateApartmentComponent} from './components/apartment/create-apartment/create-apartment.component';

import {SearchComponent} from './components/search/search.component';
import {EditPropertyComponent} from './components/property/edit-property/edit-property.component';
import {PropertyComponent} from './components/property/property.component';

import { ListBookingComponent } from './components/booking/list-booking/list-booking.component';
import { BookingComponent } from './components/booking/booking.component';
import {ReviewComponent} from './components/review/review.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'bookings', component: ListBookingComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'create-property', component: CreatePropertyComponent },
  { path: 'property', component: ListPropertyComponent},
  { path: 'property/:id', component: ListApartmentComponent},
  { path: 'apartment-list', component: ListApartmentComponent},
  { path: 'create-apartment', component: CreateApartmentComponent},
  { path: 'search', component: SearchComponent},
  { path: 'edit-property/:id', component: EditPropertyComponent },
  { path: 'property-detailes/:id', component: PropertyComponent},
  { path: 'property/:id/reviews', component: ReviewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule {
 }
