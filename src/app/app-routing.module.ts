import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RacesComponent } from './races.component';
import { RaceDetailComponent } from './race-detail.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    { path: 'races/:league/:set', component: RacesComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard/:league', component: DashboardComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'detail/:id', component: RaceDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}