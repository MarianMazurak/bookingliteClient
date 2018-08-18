import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedApartmentComponent } from './selected-apartment.component';

describe('SelectedApartmentComponent', () => {
  let component: SelectedApartmentComponent;
  let fixture: ComponentFixture<SelectedApartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedApartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
