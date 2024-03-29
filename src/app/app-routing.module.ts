import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HscrollComponent } from './hscroll/hscroll.component';
import { GridComponent } from './grid/grid.component';
import { RpslsComponent } from './rpsls/rpsls.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'grid', component: GridComponent},
  {path: 'hscroll', component: HscrollComponent},
  {path: 'rpsls', component: RpslsComponent},
  { path: '**',   redirectTo: localStorage['url'], pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
