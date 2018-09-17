import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../../../models/booking';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-photo-popup',
  templateUrl: './photo-popup.component.html',
  styleUrls: ['./photo-popup.component.css']
})
export class PhotoPopupComponent implements OnInit {

  @Input() booking: Booking;
  @Input() property: Property;
  openedPhotoUrl = '';
  opened = false;
  
  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  open(bookingContent, propertyContent) {
    this.opened = false;
    if(this.booking){
      this.modalService.open(bookingContent, {ariaLabelledBy: 'modal-booking', size: 'lg'})
    }
    else if(this.property){
      this.modalService.open(propertyContent, {ariaLabelledBy: 'modal-property', size: 'lg'})
    }
  }

  openPhoto(url: string) {
    this.openedPhotoUrl = url;
    this.opened = true;
  }

  closePhoto() {
    this.opened = false;
  }

}
