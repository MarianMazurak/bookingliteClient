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
  formValid = true;
  errorMessage = '';
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.signOut();
  }
  signIn(form: FormGroup) {
    if (form.valid) {
    this.auth.signIn(this.loginDto)
      .subscribe(res => {
        this.auth.saveToken(res);
        this.auth.loadUser();
        this.onSubmit();
        }, error => {
        console.log(error);
        this.errorMessage = JSON.parse(error.error).message;
      });
    } else {
      this.formValid = false;
    }
  }
  signOut() {
    this.auth.signOut();
  }
  onSubmit() {
    this.router.navigate(['/search']);
  }
}
