import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthService} from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

  private authentication;
  constructor(private route: ActivatedRoute, private auth: AuthService ) { }

  ngOnInit() {
    this.authentication = this.auth.isAuthenticated;
  }
}
