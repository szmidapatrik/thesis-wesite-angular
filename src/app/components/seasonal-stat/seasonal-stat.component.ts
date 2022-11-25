import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { PlayerstatsService } from 'src/app/services/playerstats.service';

@Component({
  selector: 'app-seasonal-stat',
  templateUrl: './seasonal-stat.component.html',
  styleUrls: ['./seasonal-stat.component.scss']
})
export class SeasonalStatComponent
implements OnInit, OnDestroy{

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public rowData: any;
  public sub: Subscription | any;
  public clusterData: any[] = [];

  public gridOptions: GridOptions<any> = {
    alwaysShowVerticalScroll: true,
  }

  public columnDefs: ColDef[] = [
    { field: 'Dátum', width: 130 },
    { field: 'Játékos' },
    { field: 'Név', width: 300},
    { field: 'Játékos csapata', width: 150},
    { field: 'Hazai csapat', width: 150},
    { field: 'Idegen csapat', width: 150},
    { field: 'Szezon', width: 150},
    { field: 'Min', width: 90 },
    { field: 'PTS', width: 90 },
    { field: 'FGA', width: 90 },
    { field: 'FGM', width: 90 },
    { field: 'FG%', width: 90 },
    { field: '2PA', width: 90 },
    { field: '2PM', width: 90 },
    { field: '2P%', width: 90 },
    { field: '3PA', width: 90 },
    { field: '3PM', width: 90 },
    { field: '3P%', width: 90 },
    { field: 'DREB', width: 90 },
    { field: 'OREB', width: 90 },
    { field: 'AST', width: 90 },
    { field: 'STL', width: 90 },
    { field: 'BLK', width: 90 },
    { field: 'TOV', width: 90 },
    { field: 'PF', width: 90 },
    { field: 'FD', width: 90 },
    { field: 'FTA', width: 90 },
    { field: 'FTM', width: 90 },
    { field: 'FT%', width: 90 },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    
  };

  constructor(
    private statService: PlayerstatsService
  ) {
  }


  ngOnDestroy(): void {
    this.sub.unsubscripbe();
  }

  ngOnInit(): void {
    this.sub = this.statService.getClusters("basicstats")
    .subscribe(
      data => {
        this.clusterData = data;
        this.rowData = this.clusterData;
      },
      err => console.error(err),
    );
  }

}
