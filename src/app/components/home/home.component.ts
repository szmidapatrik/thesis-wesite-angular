import { Component, OnInit } from '@angular/core';
import { GoogleChartComponent, GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { PlayerstatsService } from 'src/app/services/playerstats.service';
import { style } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent 
  implements OnInit {

  public sub: Subscription | any;
  public clusterData: any[] = [];

  public columnChartOptions: any = {
    chartArea: {height: 170},
    annotations: {
      alwaysOutside: true,
      textStyle: {
        fontSize: 14,
        color: '#000',
        auraColor: 'none'
      }
    },
    hAxis: {
      title: 'Új posztok',
    },
    vAxis: {
      title: 'Játékosok száma'
    },
    legend: null
  };

  public lineChartOptions: any = {
    chartArea: {height: 170},
    annotations: {
      alwaysOutside: true,
      textStyle: {
        fontSize: 14,
        color: '#000',
        auraColor: 'none'
      }
    },
    hAxis: {
      title: 'Felhasznált statisztikai adatok száma',
    },
    vAxis: {
      title: 'Predikció pontossága (%)'
    },
    colors: ['#ffae00'],
    legend: 'none'
  };

  public lineChartOptions2: any = {
    chartArea: {height: 170},
    annotations: {
      alwaysOutside: true,
      textStyle: {
        fontSize: 14,
        color: '#000',
        auraColor: 'none'
      }
    },
    hAxis: {
      title: 'Felhasznált statisztikai adatok száma',
    },
    vAxis: {
      title: 'Predikció pontossága (%)'
    },
    colors: ['#00ff7b'],
    legend: 'none'
  };

  public columnChart: GoogleChartInterface = {
    chartType: GoogleChartType.ColumnChart,
    dataTable: [
      ['Poszt', 'Játékosok száma'],
      ['helo', 228],
      ['test', 463],
      ['ers', 198],
      ['3', 422],
      ['4', 336],
      ['5', 376],
      ['6', 130],
      ['7', 47],
    ],
    options: this.columnChartOptions
  }

  public lineChart1: GoogleChartInterface = {
    chartType: GoogleChartType.LineChart,
    dataTable: [
      ['Prediktív statisztikák száma', 'Predikció pontossága (%)'],
      [1, 7.5],
      [10, 68],
      [30, 70],
      [50, 69],
      [70, 72],
      [90, 70.5],
      [110, 71.5],
      [130, 74],
      [140, 75.5],
      [150, 73.5],
      [170, 73],
      [190, 71],
      [210, 70],
      [230, 69],
      [250, 70.5],
      [270, 70],
      [290, 71.5],
      [310, 68.5],
      [330, 70],
    ],
    options: this.lineChartOptions
  }

  public lineChart2: GoogleChartInterface = {
    chartType: GoogleChartType.LineChart,
    dataTable: [
      ['Prediktív statisztikák száma', 'Predikció pontossága (%)'],
      [1, 80.5],
      [10, 77.5],
      [30, 77.8],
      [50, 76.3],
      [70, 79],
      [90, 77.5],
      [110, 79.3],
      [130, 77.6],
      [140, 78],
      [150, 78.3],
      [170, 77.7],
      [190, 80],
      [210, 80.3],
      [230, 80.3],
      [250, 81],
      [270, 79],
      [290, 78],
      [310, 78.3],
      [330, 77.7],
      [350, 78],
      [370, 77.5],
      [390, 78.5],
      [410, 77.5],
      [430, 77.7],
      [450, 77.7],
      [470, 78.3],
      [490, 78.3],
      [510, 77.5],
      [530, 77],
      [550, 75.5],
      [570, 76],
      [590, 75.5],
      [610, 77],
      [630, 75.5],
      [650, 75.8],
      [670, 75.8],
      [690, 75.5],
      [710, 76.2],
      [730, 75.5],
      [900, 75.5],
    ],
    options: this.lineChartOptions2
  }


  constructor(private statService: PlayerstatsService) {
    // var chartOptions: any = {
    //   chartArea: {width: 400, height: 400},
    // };
  }

  ngOnInit(): void {
    this.statService.getClusters('clusternum')
      .subscribe(
        data => {
          this.clusterData = data;
        },
        err => console.error(err),
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscripbe();
  }

}
