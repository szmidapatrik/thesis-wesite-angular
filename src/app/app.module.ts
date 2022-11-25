import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlayerStatComponent } from './components/player-stat/player-stat.component';
import { HomeComponent } from './components/home/home.component';
import { SeasonalStatComponent } from './components/seasonal-stat/seasonal-stat.component';
import { AdvancedStatComponent } from './components/advanced-stat/advanced-stat.component';
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
    Ng2GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
