import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = '';
  isOwner = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    /*if(this.auth.getUser() && this.auth.getUser().getFirstName()) {
      this.userName = this.auth.getUser().getFirstName();
    }
    if(this.auth.getUser() && this.auth.getUser().getRoles())
    this.isOwner = this.auth.getUser().getRoles().length > 1;*/
  }

}
