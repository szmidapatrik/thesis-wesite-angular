import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { PlayerstatsService } from '../../services/playerstats.service';
import { ClusterModel } from '../../model/cluster.model.ts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-player-stat',
  templateUrl: './player-stat.component.html',
  styleUrls: ['./player-stat.component.scss']
})
export class PlayerStatComponent 
  implements OnInit, OnDestroy{

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

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


  constructor(private statService: PlayerstatsService) {}


  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    backgroundColor: "#6495ED"
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [ 'Labdaigényes magasember', 'Dobó specialista', 'Tradicionális center', 'Labdajárató', 'Kiegészítőember', 'Labdaigényes pontszerző', 'Felemelkedő távoli dobó', 'Effektív centerek' ],
    datasets: [
      { data: [ 228, 463, 198, 422, 336, 376, 130, 47 ], label: 'Játékosok száma' },
    ]
  };

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
