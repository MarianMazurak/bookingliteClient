import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { PropertyComponent } from './components/property/property.component';
import { CreatePropertyComponent } from './components/property/create-property/create-property.component';
import { ListPropertyComponent } from './components/property/list-property/list-property.component';
import { ApartmentComponent } from './components/apartment/apartment.component';
import { CreateApartmentComponent } from './components/apartment/create-apartment/create-apartment.component';
import { ListApartmentComponent } from './components/apartment/list-apartment/list-apartment.component';
import { SelectedApartmentComponent } from './components/apartment/selected-apartment/selected-apartment.component';
import { BookingComponent } from './components/booking/booking.component';
import { SearchComponent } from './components/search/search.component';
import { ListBookingComponent } from './components/booking/list-booking/list-booking.component';
import { HeaderComponent } from './components/header/header.component';
import {AuthGuardService} from './services/authentication/auth-guard.service';
import { BookingService} from './services/booking/booking.service';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import { AppRoutingModule } from './/app-routing.module';
import {PhotoComponent} from './components/property/photo/photo.component';
import { PhotoListComponent } from './components/property/photo-list/photo-list.component';





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
    SelectedApartmentComponent,
    BookingComponent,
    SearchComponent,
    ListBookingComponent,
    HeaderComponent,
    PhotoComponent,
    PhotoListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
