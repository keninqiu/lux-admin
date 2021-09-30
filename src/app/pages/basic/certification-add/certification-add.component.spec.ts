import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationAddComponent } from './certification-add.component';

describe('CertificationAddComponent', () => {
  let component: CertificationAddComponent;
  let fixture: ComponentFixture<CertificationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
