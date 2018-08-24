import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {UserComponent} from './components/user/user.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {PropertyComponent} from './components/property/property.component';
import {CreatePropertyComponent} from './components/property/create-property/create-property.component';
import {ListPropertyComponent} from './components/property/list-property/list-property.component';
import {ApartmentComponent} from './components/apartment/apartment.component';
import {CreateApartmentComponent} from './components/apartment/create-apartment/create-apartment.component';
import {ListApartmentComponent} from './components/apartment/list-apartment/list-apartment.component';
import {BookingComponent} from './components/booking/booking.component';
import {SearchComponent} from './components/search/search.component';
import {ListBookingComponent} from './components/booking/list-booking/list-booking.component';
import {HeaderComponent} from './components/header/header.component';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {AppRoutingModule} from './/app-routing.module';
import {PhotoComponent} from './components/property/photo/photo.component';
import {PhotoListComponent} from './components/property/photo-list/photo-list.component';
import {UploadPhotoListComponent} from './components/property/create-property/upload-photo-list/upload-photo-list.component';


import {PropertyItemComponent} from './components/property/list-property/property-item/property-item.component';
import {PropertyService} from './services/property/property.service';
import {PropertyTypeService} from './services/propertyTypy/property-type.service';
import {ReviewComponent} from './components/review/review.component';

import {ApartmentService} from './services/apartment/apartment.service';

import {CoutryService} from './services/country/coutry.service';
import {CityService} from './services/city/city.service';
import {CreateReviewComponent} from './components/review/create-review/create-review.component';
import {CreateBookingComponent} from './components/booking/create-booking/create-booking.component';
import {ReviewBookingComponent} from './components/review/review-booking/review-booking.component';
import {ReviewsListPropertyComponent} from './components/review/reviews-list-property/reviews-list-property.component';
import { GuestArrivalsComponent } from './components/booking/guest-arrivals/guest-arrivals.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    PropertyComponent,
    CreatePropertyComponent,
    ListPropertyComponent,
    ApartmentComponent,
    CreateApartmentComponent,
    ListApartmentComponent,
    BookingComponent,
    SearchComponent,
    ListBookingComponent,
    HeaderComponent,
    PhotoComponent,
    PhotoListComponent,
    UploadPhotoListComponent,
    PropertyItemComponent,
    ReviewComponent,
    CreateReviewComponent,
    CreateBookingComponent,
    ReviewBookingComponent,
    ReviewsListPropertyComponent,
    GuestArrivalsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    PropertyService, CoutryService, CityService, ApartmentService, PropertyTypeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
