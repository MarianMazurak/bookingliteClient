import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import {ListPropertyComponent} from './components/property/list-property/list-property.component';
import {ListApartmentComponent} from './components/apartment/list-apartment/list-apartment.component';
import {CreateApartmentComponent} from './components/apartment/create-apartment/create-apartment.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'property-list', component: ListPropertyComponent},
  { path: 'property-list/apartment-list', component: ListApartmentComponent},
  { path: 'create-apartment', component: CreateApartmentComponent}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule {
 }
