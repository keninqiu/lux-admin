import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateAddComponent } from './translate-add.component';

describe('TranslateAddComponent', () => {
  let component: TranslateAddComponent;
  let fixture: ComponentFixture<TranslateAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
