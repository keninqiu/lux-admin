import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryAddDetailAddComponent } from './detail-add.component';

describe('SalaryAddDetailAddComponent', () => {
  let component: SalaryAddDetailAddComponent;
  let fixture: ComponentFixture<SalaryAddDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryAddDetailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryAddDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
