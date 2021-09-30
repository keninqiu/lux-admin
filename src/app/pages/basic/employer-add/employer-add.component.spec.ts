import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerAddComponent } from './employer-add.component';

describe('EmployerAddComponent', () => {
  let component: EmployerAddComponent;
  let fixture: ComponentFixture<EmployerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
