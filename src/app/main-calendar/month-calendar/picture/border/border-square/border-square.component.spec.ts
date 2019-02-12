import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderSquareComponent } from './border-square.component';

describe('BorderSquareComponent', () => {
  let component: BorderSquareComponent;
  let fixture: ComponentFixture<BorderSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorderSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
