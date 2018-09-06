import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsPropertyComponent } from './reviews-property.component';

describe('ReviewsPropertyComponent', () => {
  let component: ReviewsPropertyComponent;
  let fixture: ComponentFixture<ReviewsPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
