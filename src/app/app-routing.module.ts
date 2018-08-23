import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import {ListPropertyComponent} from './components/property/list-property/list-property.component';

import { CreatePropertyComponent } from './components/property/create-property/create-property.component';

import {ListApartmentComponent} from './components/apartment/list-apartment/list-apartment.component';
import {CreateApartmentComponent} from './components/apartment/create-apartment/create-apartment.component';
import {SearchComponent} from './components/search/search.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  {path : 'create-property', component: CreatePropertyComponent },
  { path: 'property-list', component: ListPropertyComponent},
  { path: 'apartment-list', component: ListApartmentComponent},
  { path: 'create-apartment', component: CreateApartmentComponent},
  { path: 'search', component: SearchComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule {
 }
