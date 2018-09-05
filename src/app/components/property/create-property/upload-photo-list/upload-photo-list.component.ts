import {Component, OnInit, ViewChild} from '@angular/core';
import {Property} from '../../../../models/property';
import {HttpClient} from '@angular/common/http';
import {PropertyService} from '../../../../services/property/property.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-upload-photo-list',
  templateUrl: './upload-photo-list.component.html',
  styleUrls: ['./upload-photo-list.component.css']
})
export class UploadPhotoListComponent implements OnInit {
  START_INFO_MESSAGE = 'Choose files...';
  UPLOAD_INFO_MESSAGE = 'click "upload" for photo uploading';
  SECCESS_MESSAGE = ': uploaded seccessfully';
  FILE_PARAM_NAME = 'file';
  RESOURCE_PARAM_NAME = 'id';
  propertyId: number;
  property: Property;
  existPhotos = [];
  files: File[] = [];
  infoMessage = this.START_INFO_MESSAGE;
  seccessMessages: string[] = [];
  errorMessages: string[] = [];
  @ViewChild('input0')
  input0;
  constructor(private http: HttpClient, private propertyService: PropertyService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.initExistPhotos();
  }
  initExistPhotos() {
    this.propertyId = Number.parseInt( this.route.snapshot.paramMap.get(this.RESOURCE_PARAM_NAME) );
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
  addPhotos(event) {
    this.clearMessages();
    this.infoMessage = this.UPLOAD_INFO_MESSAGE;
    this.files = event.target.files;
  }
  uploadPhotos() {
    this.clearMessages();
    this.infoMessage = this.START_INFO_MESSAGE;
    let answerCount = 0;
    Array.from(this.files).forEach((el, ind) => {
      const uploadData = new FormData();
      uploadData.append(this.FILE_PARAM_NAME, this.files[ind]);
      this.http.post('/api/property/' + this.propertyId + '/photo', uploadData)
        .subscribe(data => {
            this.seccessMessages.push(this.files[ind].name + this.SECCESS_MESSAGE);
            if (++answerCount === this.files.length) {
            this.input0.nativeElement.value = '';
            setTimeout(() => { this.initExistPhotos(); }, 2000);
            }
          },
          err => {
              this.errorMessages.push(this.files[ind].name + ': ' + err.error.message);
              if (++answerCount === this.files.length) {
              this.input0.nativeElement.value = '';
              setTimeout(() => { this.initExistPhotos(); }, 2000);
            }
          });
    });
  }
  clearInput() {
    this.clearMessages();
    this.infoMessage = this.START_INFO_MESSAGE;
    this.input0.nativeElement.value = '';
  }
  markPhoto(photo) {
    photo.isMark = !photo.isMark;
  }
  deletePhotos() {
    for (const photo of this.existPhotos) {
      if (photo.isMark) {
        this.http.delete('api/photo/' + photo.url.substring(photo.url.lastIndexOf('/'), photo.url.lastIndexOf('.')))
          .subscribe(
          ans => {
            this.initExistPhotos();
          }
        );
      }
    }
  }
  clearMessages() {
    this.infoMessage = null;
    this.errorMessages = [];
    this.seccessMessages = [];
  }
}
