import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { RegisterDto } from '../../../models/registerDto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerDto: RegisterDto;



  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  signUp(registerForm: FormGroup) {
    console.log('in register');
    console.log(this.registerDto);
  }

}
