import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, ColDef } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { PlayerstatsService } from 'src/app/services/playerstats.service';

@Component({
  selector: 'app-advanced-stat',
  templateUrl: './advanced-stat.component.html',
  styleUrls: ['./advanced-stat.component.scss']
})
export class AdvancedStatComponent
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
      { field: 'Játékos', width: 150},
      { field: 'Név', width: 150},
      { field: 'Játékos csapata', width: 150},
      { field: 'Hazai csapat', width: 150},
      { field: 'Idegen csapat', width: 150},
      { field: 'Szezon', width: 150},
      { field: 'Összes dobási kísérletből hárompontos (%)', width: 300 },
      { field: 'Asszisztból dobott mezőnygólok (%)', width: 270 },
      { field: 'Asszisztból dobott hárompontosok (%)', width: 270 },
      { field: 'AST%', width: 100 },
      { field: 'OREB%', width: 100 },
      { field: 'DREB%', width: 100 },
      { field: 'eFG%', width: 100 },
      { field: 'STL%', width: 100 },
      { field: 'BLK%', width: 100 },
      { field: 'TOV%', width: 100 },
      { field: 'Usage rate', width: 100 },
      { field: 'FTR', width: 100 },
      { field: 'Dobási távolság szórása', width: 200 },
      { field: 'Offenzív rating', width: 150 },
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
      this.sub = this.statService.getClusters("advancedstats")
      .subscribe(
        data => {
          this.clusterData = data;
          this.rowData = this.clusterData;
        },
        err => console.error(err),
      );
    }
}
