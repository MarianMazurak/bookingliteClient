import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService) { }
  isOpen = false;
  isOwner: boolean;
  href = '';
  ngOnInit() {
    this.auth.isOwner.subscribe( isOwner => this.isOwner = isOwner );
  }
  onClick() {
    this.href = window.location.href;
    this.isOpen = !this.isOpen;
  }
}
