import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainCalendarComponent } from './main-calendar/main-calendar.component';
import { MonthCalendarComponent } from './main-calendar/month-calendar/month-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainCalendarComponent,
    MonthCalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
