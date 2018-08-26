import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestArrivalsComponent } from './guest-arrivals.component';

describe('GuestArrivalsComponent', () => {
  let component: GuestArrivalsComponent;
  let fixture: ComponentFixture<GuestArrivalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestArrivalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestArrivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
