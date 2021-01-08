import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

export interface ShareDialogData {
  email: string;
  message: string;
}

@Component({
  selector: 'app-share-confirmation-dialog',
  templateUrl: './share-confirmation-dialog.component.html',
  styleUrls: ['./share-confirmation-dialog.component.scss']
})
export class ShareConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShareConfirmationDialogComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(shareUserEmail: HTMLInputElement, message: HTMLTextAreaElement) {
    this.dialogRef.close({email: shareUserEmail.value, message: message.value})
  }

}
