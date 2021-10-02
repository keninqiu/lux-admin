import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryAddDetailsComponent } from './details.component';

describe('SalaryAddDetailsComponent', () => {
  let component: SalaryAddDetailsComponent;
  let fixture: ComponentFixture<SalaryAddDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryAddDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryAddDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
