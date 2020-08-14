import {Component, OnInit} from '@angular/core';
import {FileService} from './file.service';
import {File} from './file.model';
import {SharedService} from '../shared-with-me/shared.service';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {

  files: File[];
  search: string;

  filenameAsc = true;
  modifiedAsc = true;
  sizeAsc = true;

  constructor(private fileService: FileService, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.fileService
      .filesObservable
      .subscribe(files => {
        if (files) {
          this.files = files;
        }
      });
    this.fileService.getAllFiles().subscribe();
  }

  onSearch(evt: any) {
    this.search = evt.target.value;
  }

  onSortFilename() {
    this.filenameAsc = !this.filenameAsc;
  }

  onSortLastModified() {
    this.modifiedAsc = !this.modifiedAsc;
  }

  onSortSize() {
    this.sizeAsc = !this.sizeAsc;
  }

  onFileChosen(file: any) {
    this.fileService.uploadFile(file).subscribe();
  }

  // openDeleteModal(file: File) {
  //   const modalRef = this.modalService.open(ModalComponent);
  //   modalRef.componentInstance.title = 'Delete';
  //   modalRef.componentInstance.content = `Do you want to delete: ${file.filename}`;
  //   modalRef.result
  //     .then(result => {
  //       if (result.ok) {
  //         this.fileService.deleteFile(file).subscribe();
  //       }
  //     })
  //     .catch(error => console.log(error));
  // }

  // openDownloadModal(file: File) {
  //   const modalRef = this.modalService.open(ModalComponent);
  //   modalRef.componentInstance.title = 'Download';
  //   modalRef.componentInstance.content = `Do you want to download: ${file.filename}`;
  //   modalRef.result
  //     .then(result => {
  //       if (result.ok) {
  //         const a = document.createElement('a');
  //         a.href = `http://localhost:8080/api/files/${file.fileID}/download`;
  //         a.click();
  //       }
  //     })
  //     .catch(error => console.log(error));
  // }

  // openShareModal(file: File) {
  //   const modalRef = this.modalService.open(ShareModalComponent);
  //   modalRef.result
  //     .then(result => {
  //       if (result) {
  //         this.sharedService.shareFile(file.fileID, result.email, result.message).subscribe();
  //       }
  //     })
  //     .catch(error => console.log(error));
  // }
}
