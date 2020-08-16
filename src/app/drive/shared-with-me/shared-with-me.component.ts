import {Component, OnInit} from '@angular/core';
import {SharedService} from './shared.service';
import {Shared} from './shared.model';

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.scss']
})
export class SharedWithMeComponent implements OnInit {

  shareds: Shared[];

  search: string;

  filenameAsc = true;
  sizeAsc = true;
  nameAsc = true;
  shareDateAsc = true;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService
      .sharedsObservable
      .subscribe(shareds => {
          if (shareds) {
            this.shareds = shareds;
          }
        }
      );
    this.sharedService.getAllShareds().subscribe();
  }

  onSortFilename() {
    this.filenameAsc = !this.filenameAsc;
  }

  onSortSize() {
    this.sizeAsc = !this.sizeAsc;
  }

  onSortName() {
    this.nameAsc = !this.nameAsc;
  }

  onSortShareDate() {
    this.shareDateAsc = !this.shareDateAsc;
  }

  onSearch(evt: any) {
    this.search = evt.target.value;
  }

  // openDiscardModal(shared: Shared) {
  //   const modalRef = this.modalService.open(ModalComponent);
  //   modalRef.componentInstance.title = 'Discard';
  //   modalRef.componentInstance.content = `Do you want to discard: ${shared.sharedFileFilename}`;
  //   modalRef.result
  //     .then(result => {
  //       if (result.ok) {
  //         this.sharedService.unshare(shared).subscribe();
  //       }
  //     })
  //     .catch(error => console.log(error));
  // }

  // openDownloadModal(shared: Shared) {
  //   const modalRef = this.modalService.open(ModalComponent);
  //   modalRef.componentInstance.title = 'Download';
  //   modalRef.componentInstance.content = `Do you want to download: ${shared.sharedFileFilename}`;
  //   modalRef.result
  //     .then(result => {
  //       if (result.ok) {
  //         const a = document.createElement('a');
  //         a.href = `http://localhost:8080/api/files/${shared.sharedFileID}/download`;
  //         a.click();
  //       }
  //     })
  //     .catch(error => console.log(error));
  // }

  // openMessageModal(message: any) {
  //   const modalRef = this.modalService.open(ModalComponent);
  //   modalRef.componentInstance.title = 'Message';
  //   modalRef.componentInstance.content = message;
  //   modalRef.result
  //     .then()
  //     .catch(error => console.log(error));
  // }

  // openShareModal(shared: Shared) {
  //   const modalRef = this.modalService.open(ShareModalComponent);
  //   modalRef.result
  //     .then(result => {
  //       if (result) {
  //         this.sharedService.shareFile(shared.sharedFileID, result.email, result.message).subscribe();
  //       }
  //     })
  //     .catch(error => console.log(error));
  // }
}
