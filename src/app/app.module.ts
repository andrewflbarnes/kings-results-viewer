import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { RaceDetailComponent } from './race-detail.component';
import { RacesComponent } from './races.component';
import { DashboardComponent } from './dashboard.component';
import { RaceService } from './race.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    RaceDetailComponent,
    RacesComponent,
    DashboardComponent
  ],
  providers: [ RaceService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
