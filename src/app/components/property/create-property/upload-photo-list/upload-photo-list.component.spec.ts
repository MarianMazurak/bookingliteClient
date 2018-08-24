import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPhotoListComponent } from './upload-photo-list.component';

describe('UploadPhotoListComponent', () => {
  let component: UploadPhotoListComponent;
  let fixture: ComponentFixture<UploadPhotoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPhotoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
