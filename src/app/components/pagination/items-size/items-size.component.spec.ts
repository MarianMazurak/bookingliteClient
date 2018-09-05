import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsSizeComponent } from './items-size.component';

describe('ItemsSizeComponent', () => {
  let component: ItemsSizeComponent;
  let fixture: ComponentFixture<ItemsSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
