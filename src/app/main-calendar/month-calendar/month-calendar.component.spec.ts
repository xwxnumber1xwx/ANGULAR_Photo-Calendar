import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as resize from 'angular-resizable-element';
import { MonthCalendarComponent } from './month-calendar.component';

describe('MonthCalendarComponent', () => {
  let component: MonthCalendarComponent;
  let fixture: ComponentFixture<MonthCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthCalendarComponent, resize],
      imports: [
        resize
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
