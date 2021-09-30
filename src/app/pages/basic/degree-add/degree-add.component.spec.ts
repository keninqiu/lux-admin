import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeAddComponent } from './degree-add.component';

describe('DegreeAddComponent', () => {
  let component: DegreeAddComponent;
  let fixture: ComponentFixture<DegreeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegreeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
