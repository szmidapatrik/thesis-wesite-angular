import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlayerStatComponent } from './components/player-stat/player-stat.component';
import { HomeComponent } from './components/home/home.component';
import { SeasonalStatComponent } from './components/seasonal-stat/seasonal-stat.component';
import { AdvancedStatComponent } from './components/advanced-stat/advanced-stat.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const appRouting: Routes = [
  {path: '', component: HomeComponent},
  {path: 'posts', component: PlayerStatComponent},
  {path: 'stats', component: SeasonalStatComponent},
  {path: 'advancedstats', component: AdvancedStatComponent},
  {path: '**', redirectTo: ''},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlayerStatComponent,
    HomeComponent,
    SeasonalStatComponent,
    AdvancedStatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    RouterModule.forRoot(appRouting),
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NgChartsConfiguration, useValue: { generateColors: false }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
