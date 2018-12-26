import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MainCalendarComponent } from './main-calendar.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';


describe('MainCalendarComponent', () => {
  let component: MainCalendarComponent;
  let fixture: ComponentFixture<MainCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCalendarComponent, SidebarComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule]
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
