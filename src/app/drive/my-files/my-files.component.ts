import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FileService} from './file.service';
import {File} from './file.model';
import {SharedService} from '../shared-with-me/shared.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {VerificationDialogComponent} from '../../auth/log-in/verification-dialog/verification-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SimpleConfirmationDialogComponent} from '../../shared/simple-confirmation-dialog/simple-confirmation-dialog.component';
import {
  ShareConfirmationDialogComponent,
  ShareDialogData
} from '../../shared/share-confirmation-dialog/share-confirmation-dialog.component';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../auth/user.model';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['icon', 'filename', 'type', 'size', 'lastModified', 'action'];
  dataSource: MatTableDataSource<File>;
  user: User;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fileService: FileService,
              private authService: AuthService,
              private sharedService: SharedService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);

    this.fileService
      .filesObservable
      .subscribe(files => {
        if (files) {
          this.dataSource.data = files;
        }
      });
    this.fileService.getAllFiles().subscribe();

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

  deleteFile(file: File) {
    const matDialogRef = this.dialog.open(SimpleConfirmationDialogComponent, {
      data: {
        headerText: 'Delete file',
        contentText: 'Are you sure about deleting?',
        submitButtonText: 'DELETE',
        submitButtonClass: '',
        cancelButtonText: 'Cancel',
        cancelButtonClass: ''
      }
    });

    matDialogRef.afterClosed().subscribe((submitted: boolean) => {
      if (submitted) {
        this.fileService.deleteFile(file).subscribe();
      }
    });
  }

  downloadFile(file: File) {
    const a = document.createElement('a');
    a.href = `http://localhost:8080/api/files/${file.fileId}/download`;
    a.click();
  }

  shareFile(file: File) {
    const matDialogRef = this.dialog.open(ShareConfirmationDialogComponent);

    matDialogRef.afterClosed().subscribe((data: ShareDialogData) => {
      if (!data || !data.email) {
        console.log('data not exists');
        return;
      }
      this.sharedService.shareFile(file.fileId, data.email, data.message ? data.message : '').subscribe();
    });
  }

  handleAttachmentChange(files: FileList) {
    if (files.length !== 1) {
      alert('Must choose exactly one file!');
      return;
    }
    this.fileService.uploadFile(files.item(0)).subscribe();
  }

  onFileInputClick(fileInput: HTMLInputElement) {
    fileInput.click();
  }
}
