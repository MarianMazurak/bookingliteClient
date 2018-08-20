import { Component, OnInit } from '@angular/core';
import {RegisterUser} from '../../../models/user-register';
import {AuthService} from '../../../services/authentication/auth.service';
import {Router} from '@angular/router';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDto = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signIn(form: FormGroup) {
    this.auth.signIn(this.loginDto)
      .subscribe(res => {
        console.log('Hello token');
        console.log(res);
        this.auth.saveToken(res);
        this.auth.isAuthenticated = true;
        this.router.navigate(['/']);
      });
  }

  getToken() {
    console.log('in getToken component');
    console.log('in getToken component111', this.auth.getToken());
  }

  signOut() {
    this.auth.signOut();
  }
}
