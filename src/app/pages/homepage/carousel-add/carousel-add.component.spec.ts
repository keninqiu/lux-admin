import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselAddComponent } from './carousel-add.component';

describe('CarouselAddComponent', () => {
  let component: CarouselAddComponent;
  let fixture: ComponentFixture<CarouselAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
