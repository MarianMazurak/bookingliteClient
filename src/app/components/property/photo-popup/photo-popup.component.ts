import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../../../models/booking';

@Component({
  selector: 'app-photo-popup',
  templateUrl: './photo-popup.component.html',
  styleUrls: ['./photo-popup.component.css']
})
export class PhotoPopupComponent implements OnInit {

  @Input() booking: Booking;
  openedPhotoUrl = '';
  opened = false;
  
  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  open(content) {
    this.opened = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
  }

  openPhoto(url: string) {
    this.openedPhotoUrl = url;
    this.opened = true;
  }

  closePhoto() {
    this.opened = false;
  }

}
