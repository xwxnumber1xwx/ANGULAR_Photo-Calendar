import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainCalendarComponent } from './main-calendar/main-calendar.component';
import { MonthCalendarComponent } from './main-calendar/month-calendar/month-calendar.component';
import { Image } from './image'
import { ResizableModule } from 'angular-resizable-element';
import { EditBarComponent } from './main-calendar/edit-bar/edit-bar.component';
import { PictureComponent } from './main-calendar/month-calendar/picture/picture.component';
import { ToolsBarComponent } from './main-calendar/month-calendar/picture/tools-bar/tools-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainCalendarComponent,
    MonthCalendarComponent,
    EditBarComponent,
    PictureComponent,
    ToolsBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ResizableModule
  ],
  providers: [Image],
  bootstrap: [AppComponent]
})
export class AppModule { }
