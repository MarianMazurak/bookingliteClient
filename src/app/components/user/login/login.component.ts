import { Component, OnInit } from '@angular/core';
import { LoginDto } from '../../../models/loginDto';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDto: LoginDto = new LoginDto();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signIn(form: FormGroup) {
    console.log(form);
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
