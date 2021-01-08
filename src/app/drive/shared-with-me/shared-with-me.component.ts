import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SharedService} from './shared.service';
import {SharedFile} from './shared-file.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SimpleConfirmationDialogComponent} from '../../shared/simple-confirmation-dialog/simple-confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {
  ShareConfirmationDialogComponent,
  ShareDialogData
} from '../../shared/share-confirmation-dialog/share-confirmation-dialog.component';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../auth/user.model';

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.scss']
})
export class SharedWithMeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['icon', 'filename', 'shareText', 'sharingUser', 'size', 'shareDate', 'action'];
  dataSource: MatTableDataSource<SharedFile>;
  user: User;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService, private sharedService: SharedService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);

    this.sharedService
      .sharedFilesObservable
      .subscribe(sharedFile => {
        if (sharedFile) {
          this.dataSource.data = sharedFile;
        }
      });
    this.sharedService.getAllSharedFiles().subscribe();

    this.authService
      .userObservable
      .subscribe(
        user => {
          this.user = user;
        }
      );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  discardSharedFile(sharedFile: SharedFile) {
    const matDialogRef = this.dialog.open(SimpleConfirmationDialogComponent, {
      data: {
        headerText: 'Discard file',
        contentText: 'Are you sure about discarding?',
        submitButtonText: 'DISCARD',
        submitButtonClass: '',
        cancelButtonText: 'Cancel',
        cancelButtonClass: ''
      }
    });

    matDialogRef.afterClosed().subscribe((submitted: boolean) => {
      if (submitted) {
        this.sharedService.unshare(sharedFile).subscribe();
      }
    });
  }

  downloadSharedFile(sharedFile: SharedFile) {
    const a = document.createElement('a');
    a.href = `http://localhost:8080/api/files/${sharedFile.sharedFileFileId}/download`;
    a.click();
  }

  shareFile(sharedFile: SharedFile) {
    const matDialogRef = this.dialog.open(ShareConfirmationDialogComponent);

    matDialogRef.afterClosed().subscribe((data: ShareDialogData) => {
      if (!data || !data.email) {
        console.log('data not exists');
        return;
      }
      this.sharedService.shareFile(sharedFile.sharedFileFileId, data.email, data.message ? data.message : '').subscribe();
    });
  }

}
