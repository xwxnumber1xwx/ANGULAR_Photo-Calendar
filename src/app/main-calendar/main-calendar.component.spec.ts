import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MainCalendarComponent } from './main-calendar.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component'


describe('MainCalendarComponent', () => {
  let component: MainCalendarComponent;
  let fixture: ComponentFixture<MainCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCalendarComponent, SidebarComponent, MonthCalendarComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',
  inject(
    [HttpTestingController],
    () => {
      expect(component).toBeTruthy()
    }
  )
)
});
