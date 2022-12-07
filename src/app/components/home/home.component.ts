import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { PlayerstatsService } from 'src/app/services/playerstats.service';
import { style } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { PlayerModel } from '../../model/player.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent 
  implements OnInit {

  public sub: Subscription | any;
  public allStarList: any[] = [];
  public nonAllStarList: any[] = [];
  public selectedAllStar: any = null;
  public selectedNonAllStar: any = null;
  public required: boolean = true;
  public compareFirstReady: boolean = false;
  public compareSecondReady: boolean = false;


  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    backgroundColor: "#6495ED"
  };

  public barChartType: ChartType = 'bar';

  public barChartData: any | ChartData<'bar'>;


  constructor(private statService: PlayerstatsService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.statService.getClusters('allstars')
      .subscribe(
        data => {
          this.allStarList = data;
        },
        err => console.error(err),
      );
      this.statService.getClusters('nonallstars')
      .subscribe(
        data => {
          this.nonAllStarList = data;
        },
        err => console.error(err),
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscripbe();
  }

  changeAllStar(value: any) {
    this.selectedAllStar = value;
  }

  changeNonAllStar(value: any) {
    this.selectedNonAllStar = value;
  }

  comparePlayers(): any {
    if(this.selectedAllStar == "" || this.selectedAllStar == null || this.selectedNonAllStar == "" || this.selectedNonAllStar == null) {
      this.snackBar.open('Please select and All-star and a Non All-star player', 'Ok', {duration: 3000});
      return;
    }
    // Variables
    var selAS: string;
    var selASSeas: string;
    var selNAS: string;
    var selNASSeas: string;
    // All-star check
    if (this.selectedAllStar == "All-star Avg.") {
      selAS = "All-star Avg."; selASSeas = "2015";
    }
    else {
      selAS = this.selectedAllStar.split(" - ", 1)[0] + " - " + this.selectedAllStar.split(" - ", 2)[1];
      selASSeas = this.selectedAllStar.split(" - ")[2].substring(0,4);
    }
    // Non All-star check
    if (this.selectedNonAllStar == "Non All-star Avg.") {
      selNAS = "Non All-star Avg."; selNASSeas = "2015";
    }
    else {
      selNAS = this.selectedNonAllStar.split(" - ", 1)[0] + " - " + this.selectedNonAllStar.split(" - ", 2)[1];
      selNASSeas = this.selectedNonAllStar.split(" - ")[2].substring(0,4);
    }
    // Request
    this.statService.getClusters(`compare?Player=${selAS}&Season=${selASSeas}`)
      .subscribe(
        data => {
          var allStarData: PlayerModel = data[0];
          this.compareFirstReady = true;
          this.statService.getClusters(`compare?Player=${selNAS}&Season=${selNASSeas}`)
          .subscribe(
            data => {
              var nonAllStarData: PlayerModel = data[0];
              this.compareSecondReady = true;
              console.log(allStarData)
              console.log(nonAllStarData)
              this.barChartData = {
                labels: [ "OREB", "DREB", "PTS", "2PM", "3PM", "AST", "BLK", "STL", "FTM", "TOV",  
                          "Usg%", "3FGA%", "DNKA%", "2FG_Assisted%", "3FG_Assisted%", "ShotDistSTD",
                          "0-3FGA%", "3-10FGA%", "10-22FGA%", ],
                datasets: [
                  { data: [ allStarData.oreb, allStarData.dreb, allStarData.pts, allStarData.twopm, allStarData.threepm,
                            allStarData.ast, allStarData.blk, allStarData.stl, allStarData.ftm, allStarData.tov,
                            allStarData.usg, allStarData.threefgap, allStarData.dnkap, allStarData.twofg_assistedp,
                            allStarData.threefg_sssistedp, allStarData.shotDistSTS, allStarData.closeFGAp, allStarData.midFGAp, allStarData.longFGAp,],
                    label: allStarData.Player,
                  },
                  { data: [ nonAllStarData.oreb, nonAllStarData.dreb, nonAllStarData.pts, nonAllStarData.twopm, nonAllStarData.threepm,
                    nonAllStarData.ast, nonAllStarData.blk, nonAllStarData.stl, nonAllStarData.ftm, nonAllStarData.tov,
                    nonAllStarData.usg, nonAllStarData.threefgap, nonAllStarData.dnkap, nonAllStarData.twofg_assistedp,
                    nonAllStarData.threefg_sssistedp, nonAllStarData.shotDistSTS, nonAllStarData.closeFGAp, nonAllStarData.midFGAp, nonAllStarData.longFGAp,],
                    label: nonAllStarData.Player,
                    backgroundColor: ["orange"],
                   },
                ],
              };
            },
            err => console.error(err),
          );
        },
        err => console.error(err),
      );
  }

  reverse(s: string){
    return s.split("").reverse().join("");
}

}
