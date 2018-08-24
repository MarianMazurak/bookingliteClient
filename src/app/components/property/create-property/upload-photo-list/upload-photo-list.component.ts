import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Property} from '../../../../models/property';
import {HttpClient} from '@angular/common/http';
import {PropertyService} from '../../../../services/property/property.service';

@Component({
  selector: 'app-upload-photo-list',
  templateUrl: './upload-photo-list.component.html',
  styleUrls: ['./upload-photo-list.component.css']
})
export class UploadPhotoListComponent implements OnInit {
  @Input()
  propertyId: number;
  property: Property;
  existPhotos = [];
  files: File[] = [];
  messageList: string[] = ['add photo', 'add photo', 'add photo'];
  @ViewChild('input0')
  input0;
  @ViewChild('input1')
  input1;
  @ViewChild('input2')
  input2;
  inputs = [];
  constructor(private http: HttpClient, private propertyService: PropertyService) {}
  ngOnInit() {
    this.initExistPhotos();
  }
  initExistPhotos() {
    this.propertyService.getPropertyById(this.propertyId).subscribe(
      pr => {
        this.property = pr;
        this.existPhotos = [];
        for (const photo of this.property.photos) {
          this.existPhotos.push({url: photo.url, isMark: false});
        }
      }
    );
  }
  addPhoto(event, photoNumber: number) {
    this.messageList[photoNumber] = event.target.files[0].name;
    this.files[photoNumber] = event.target.files[0];
  }
  uploadPhotos() {
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i] && this.messageList[i] !== 'success' ) {
        const uploadData = new FormData();
        uploadData.append('file', this.files[i]);
        this.http.post('/api/property/' + this.propertyId + '/photo', uploadData)
          .subscribe(data => {
              this.messageList[i] = 'success';
              setTimeout(() => {this.initExistPhotos(); }, 1000);
            },
            err => {
              this.messageList[i] = err.error.message;
            });
      }
    }
  }
  clearInput(inputNumber: number) {
    if (this.inputs.length < 3) {
      this.inputs.push(this.input0);
      this.inputs.push(this.input1);
      this.inputs.push(this.input2);
    }
    this.inputs[inputNumber].nativeElement.value = '';
    this.files[inputNumber] = null;
    this.messageList[inputNumber] = 'add photo';
  }
  clearAllInputs() {
    for (let i = 0; i < this.inputs.length; i++) {
      this.clearInput(i);
    }
  }
  markPhoto(photo) {
    photo.isMark = !photo.isMark;
  }
  deletePhotos()  {
    for (const photo of this.existPhotos) {
      if (photo.isMark) {
        this.http.delete('api/photo/' + photo.url.substring(photo.url.lastIndexOf('/'), photo.url.lastIndexOf('.'))).subscribe(
          ans => {
            this.initExistPhotos();
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }
}
