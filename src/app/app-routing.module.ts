import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import {ListPropertyComponent} from './components/property/list-property/list-property.component';
import { CreatePropertyComponent } from './components/property/create-property/create-property.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  {path: 'property-List',component: ListPropertyComponent},
  {path : 'create-property', component: CreatePropertyComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule {
 }
