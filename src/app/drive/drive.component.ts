import {Component, OnInit} from '@angular/core';
import {User} from '../auth/user.model';
import {AuthService} from '../auth/auth.service';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {NumberToSizePipe} from './number-to-size.pipe';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {

  user: User;

  isCollapsed = true;

  pieChartOptions: ChartOptions;
  pieChartLabels: Label[];
  pieChartData: number[];
  pieChartType: ChartType;
  pieChartLegend: boolean;
  pieChartColors;

  constructor(private authService: AuthService, private pipe: NumberToSizePipe) {
  }

  ngOnInit() {
    this.authService
      .userObservable
      .subscribe(
        user => {
          this.user = user;
        }
      );
    this.setUpChart(this.user.stored, this.user.limit);
  }

  setUpChart(stored, limit) {
    this.pieChartOptions = {
      title: {
        text: this.pipe.transform(this.user.stored) + ' of ' + this.pipe.transform(this.user.limit) + ' used',
        display: true,
        fontSize: 15,
      },
      responsive: true,
      aspectRatio: 1.5,
      legend: {
        position: 'top',
        display: false
      }
    };
    this.pieChartLabels = [this.pipe.transform(stored), this.pipe.transform(limit - stored)];
    this.pieChartData = [stored, limit - stored];
    this.pieChartType = 'pie';
    this.pieChartLegend = true;
    this.pieChartColors = [
      {
        backgroundColor: ['rgba(255,0,0,0.7)', 'rgba(0,255,0,0.7)'],
      },
    ];
  }

}
