import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestAddComponent } from './best-add.component';

describe('BestAddComponent', () => {
  let component: BestAddComponent;
  let fixture: ComponentFixture<BestAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
