import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent implements OnInit {
  isOwner = false;
  href = '';
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.isOwner.subscribe( res => this.isOwner = res);
    this.href = window.location.href;
  }
}
