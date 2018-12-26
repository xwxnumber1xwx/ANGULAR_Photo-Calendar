import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCalendarComponent } from './main-calendar/main-calendar.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainCalendarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
