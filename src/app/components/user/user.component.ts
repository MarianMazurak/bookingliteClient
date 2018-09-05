import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/authentication/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUserFromBackEnd().subscribe(user => {
      this.user = user;
    });
  }
}
