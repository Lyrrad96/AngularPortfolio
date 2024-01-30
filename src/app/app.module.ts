import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { HscrollComponent } from './hscroll/hscroll.component';
import { GridComponent } from './grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RpslsComponent } from './rpsls/rpsls.component';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    HscrollComponent,
    GridComponent,
    RpslsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
