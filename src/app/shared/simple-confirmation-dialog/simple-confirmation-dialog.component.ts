import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface SimpleDialogData {
  headerText: string;
  contentText: string;
  submitButtonText: string;
  submitButtonClass: string;
  cancelButtonText: string;
  cancelButtonClass: string;
}

@Component({
  selector: 'app-simple-confirmation-dialog',
  templateUrl: './simple-confirmation-dialog.component.html',
  styleUrls: ['./simple-confirmation-dialog.component.scss']
})
export class SimpleConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SimpleConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: SimpleDialogData) { }

  ngOnInit(): void {
  }

  onSubmitDialog() {
    this.dialogRef.close(true);
  }
}
