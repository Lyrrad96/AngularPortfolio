import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HscrollComponent } from './hscroll/hscroll.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'hscroll', component: HscrollComponent},
  { path: '**',   redirectTo: '/hscroll', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
