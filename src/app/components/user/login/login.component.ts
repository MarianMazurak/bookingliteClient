import { Component, OnInit } from '@angular/core';
import {RegisterUser} from '../../../models/user-register';
import {AuthService} from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticated;
  public user: RegisterUser;



  constructor(private auth: AuthService) { }

  ngOnInit() {
    console.log('Authentic 1 ', this.authenticated);
    this.authenticated = this.auth.isAuthenticated;
    console.log('Authentic 2 ', this.authenticated);
    this.user = new RegisterUser();
  }

  signIn(fields) { // TODO auth
    console.log('Hello');
    console.log(fields.email);
    console.log(fields.password);
    this.auth.signIn(fields)
      .subscribe(res => {
        console.log('Hello token');
        console.log(res);
        this.auth.saveToken(res);
        this.auth.setauthenticated(true);
        this.authenticated = true;
      } );
  }

  getToken() {
    console.log('in getToken component');
    console.log('in getToken component111', this.auth.getToken());
  }

  signOut() {
    this.authenticated = this.auth.signOut();
  }
}
