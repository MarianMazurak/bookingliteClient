import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent implements OnInit {
  user: User;
  href = '';
  constructor(public auth: AuthService) { }

  ngOnInit() {
<<<<<<< HEAD
        this.auth.getUserFromBackEnd().subscribe(user => {
      this.user = user;
    });
    this.uhref = window.location.href;
=======
    this.href = window.location.href;
>>>>>>> master
  }
}
