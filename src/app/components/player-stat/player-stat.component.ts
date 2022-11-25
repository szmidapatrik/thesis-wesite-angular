import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { PlayerstatsService } from '../../services/playerstats.service';
import { ClusterModel } from '../../model/cluster.model.ts';

@Component({
  selector: 'app-player-stat',
  templateUrl: './player-stat.component.html',
  styleUrls: ['./player-stat.component.scss']
})
export class PlayerStatComponent 
  implements OnInit, OnDestroy{

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public rowData: any;
  public sub: Subscription | any;
  public clusterData: ClusterModel[] = [];

  public columnDefs: ColDef[] = [
    { field: 'Player', minWidth: 200, maxWidth: 500, width: 400},
    { field: 'Season', minWidth: 100, maxWidth: 500, width: 300},
    { field: 'Post', minWidth: 100, maxWidth: 500, width: 300},
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  public gridOptions: GridOptions<any> = {
    alwaysShowHorizontalScroll: false,
    suppressHorizontalScroll: true,
  }


  constructor(
    private statService: PlayerstatsService
  ) {
  }


  ngOnDestroy(): void {
    this.sub.unsubscripbe();
  }

  ngOnInit(): void {
    this.sub = this.statService.getClusters("clusters")
    .subscribe(
      data => {
        this.clusterData = data;
        this.rowData = this.clusterData;
      },
      err => console.error(err),
    );
  }


}
