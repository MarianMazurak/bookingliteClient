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
import { BookingComponent } from './components/booking/booking.component';
import { SearchComponent } from './components/search/search.component';
import { ListBookingComponent } from './components/booking/list-booking/list-booking.component';
import { HeaderComponent } from './components/header/header.component';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import { AppRoutingModule } from './/app-routing.module';
import {PhotoComponent} from './components/property/photo/photo.component';
import { PhotoListComponent } from './components/property/photo-list/photo-list.component';
import { UploadPhotoListComponent } from './components/property/create-property/upload-photo-list/upload-photo-list.component';
import { PropertyItemComponent } from './components/property/list-property/property-item/property-item.component';
import { PropertyService } from './services/property/property.service';
import { PropertyTypeService } from './services/propertyTypy/property-type.service';
import { ApartmentService } from './services/apartment/apartment.service';
import { CountryService } from './services/country/coutry.service';
import { CityService } from './services/city/city.service';
import {SearchFormComponent} from './components/search/search-form/search-form.component';
import { EditPropertyComponent } from './components/property/edit-property/edit-property.component';
import { BookingCreateComponent } from './components/booking/booking-create/booking-create.component';
import { GuestArrivalsComponent } from './components/booking/guest-arrivals/guest-arrivals.component';
import { ReviewBookingComponent } from './components/review/review-booking/review-booking.component';
import { ReviewCreateComponent } from './components/review/review-create/review-create.component';
import { OwnerPropertiesComponent } from './components/property/owner-properties/owner-properties.component';
import { UserNavigationComponent } from './components/user/user-navigation/user-navigation.component';
import { UserPropertiesComponent } from './components/user/user-profile/user-properties/user-properties.component';
import { UserApartmentsComponent } from './components/user/user-profile/user-properties/user-apartments/user-apartments.component';
import { EditApartmentComponent } from './components/apartment/edit-apartment/edit-apartment.component';
import { PaginationService } from './services/pagination/pagination.service';
import { ItemsSizeComponent } from './components/pagination/items-size/items-size.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PhotoPopupComponent } from './components/property/photo-popup/photo-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewsPropertyComponent } from './components/review/reviews-property/reviews-property.component';
import { PropertyDetailsComponent } from './components/property/property-details/property-details.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';

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
    SearchFormComponent,
    EditPropertyComponent,
    BookingCreateComponent,
    GuestArrivalsComponent,
    ReviewBookingComponent,
    ReviewCreateComponent,
    PaginationComponent,
    ItemsSizeComponent,
    PhotoPopupComponent,
    OwnerPropertiesComponent,
    UserNavigationComponent,
    UserPropertiesComponent,
    UserApartmentsComponent,
    EditApartmentComponent,
    ReviewsPropertyComponent,
    PropertyDetailsComponent,
    AdvancedSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    PropertyService, CountryService, CityService, ApartmentService, PropertyTypeService, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
