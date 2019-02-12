import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderRotationButtonComponent } from './border-rotation-button.component';

describe('BorderRotationButtonComponent', () => {
  let component: BorderRotationButtonComponent;
  let fixture: ComponentFixture<BorderRotationButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorderRotationButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderRotationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
