import {Component, OnInit} from '@angular/core';
import {User} from '../auth/user.model';
import {AuthService} from '../auth/auth.service';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {

  user: User;
  pieChartOptions: ChartOptions;
  pieChartLabels: Label[];
  pieChartData: number[];
  pieChartType: ChartType;
  pieChartLegend: boolean;
  pieChartColors;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.setUpChart(this.user.stored, this.user.limit);
  }

  setUpChart(stored, limit) {
    this.pieChartOptions = {
      title: {
        text: this.user.stored.toString() + ' MB of ' + this.user.limit.toString() + ' MB used',
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
    this.pieChartLabels = ['Stored MB', 'Available MB'];
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
