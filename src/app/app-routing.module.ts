import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MydashboardComponent } from './mydashboard/mydashboard.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'mydashboard', component: MydashboardComponent },
  { path: '', component: MydashboardComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
