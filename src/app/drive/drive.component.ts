import {Component, OnInit} from '@angular/core';
import {User} from '../auth/user.model';
import {AuthService} from '../auth/auth.service';
import {UploadProgressService} from './upload-progress.service';
import {NotificationService} from './notification.service';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {

  user: User;

  openSideNav = true;

  constructor(private authService: AuthService,
              private uploadProgressService: UploadProgressService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.authService
      .userObservable
      .subscribe(
        user => {
          this.user = user;
        }
      );
  }

  logout() {
    this.authService.logout();
  }


  clearUploads($event: MouseEvent) {
    $event.stopPropagation();

    this.uploadProgressService.clear();
  }

  clearNotifications($event: MouseEvent) {
    $event.stopPropagation();

    this.notificationService.clear();
  }

  // getPlan(): Plan {
  //   let plan: Plan;
  //
  //   switch (this.user.limit) {
  //     case 5000000:
  //       plan = Plan.free;
  //       break;
  //     case 5000000000:
  //       plan = Plan.business;
  //       break;
  //     case 100000000000:
  //       plan = Plan.pro;
  //       break;
  //     default:
  //       plan = Plan.free;
  //   }
  //
  //   return plan;
  // }

  // openUpgradeModal() {
  //   const modalRef = this.modalService.open(UpgradeModalComponent, {size: 'xl'});
  //
  //   modalRef.componentInstance.plan = this.getPlan();
  //
  //   modalRef.result
  //     .then(result => {
  //         if (result) {
  //           this.authService.upgradeUser(result.plan).subscribe();
  //         }
  //       }
  //     )
  //     .catch(err => console.log(err));
  // }

  // openSettingsModal() {
  //   const modalRef = this.modalService.open(SettingsModalComponent, {size: 'lg'});
  //   modalRef.componentInstance.user = this.user;
  //   modalRef.result
  //     .then(result => {
  //         if (result) {
  //           this.authService
  //             .deleteUser()
  //             .subscribe(
  //               () => {
  //                 this.authService.logout();
  //               },
  //               error => console.log(error)
  //             );
  //         }
  //       }
  //     )
  //     .catch(err => console.log(err));
  // }
}
