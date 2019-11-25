import {Component, OnInit} from '@angular/core';
import {User} from '../auth/user.model';
import {AuthService} from '../auth/auth.service';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {NumberToSizePipe} from './number-to-size.pipe';
import {ToastService} from './toast.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Plan, UpgradeModalComponent} from '../shared/upgrade-modal/upgrade-modal.component';
import {SettingsModalComponent} from '../shared/settings-modal/settings-modal.component';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {

  user: User;

  isCollapsed = true;
  isCollapsedSideBar = true;

  pieChartOptions: ChartOptions;
  pieChartLabels: Label[];
  pieChartData: number[];
  pieChartType: ChartType;
  pieChartLegend: boolean;
  pieChartColors;

  constructor(private authService: AuthService,
              private pipe: NumberToSizePipe,
              private toastsService: ToastService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.authService
      .userObservable
      .subscribe(
        user => {
          this.user = user;
          if (user) {
            this.setUpChart(this.user.stored, this.user.limit);
          }
        }
      );
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

  logout() {
    this.authService.logout();
  }

  getPlan(): Plan {
    let plan: Plan;

    switch (this.user.limit) {
      case 5000000:
        plan = Plan.free;
        break;
      case 5000000000:
        plan = Plan.business;
        break;
      case 100000000000:
        plan = Plan.pro;
        break;
      default:
        plan = Plan.free;
    }

    return plan;
  }

  openUpgradeModal() {
    const modalRef = this.modalService.open(UpgradeModalComponent, {size: 'xl'});

    modalRef.componentInstance.plan = this.getPlan();

    modalRef.result
      .then(result => {
          if (result) {
            this.authService.upgradeUser(result.plan).subscribe();
          }
        }
      )
      .catch(err => console.log(err));
  }

  openSettingsModal() {
    const modalRef = this.modalService.open(SettingsModalComponent, {size: 'lg'});
    modalRef.componentInstance.user = this.user;
    modalRef.result
      .then(result => {
          if (result) {
            this.authService
              .deleteUser()
              .subscribe(
                () => {
                  this.authService.logout();
                },
                error => console.log(error)
              );
          }
        }
      )
      .catch(err => console.log(err));
  }
}
