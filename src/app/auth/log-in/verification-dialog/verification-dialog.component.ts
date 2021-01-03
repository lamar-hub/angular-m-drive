import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-verification-dialog',
  templateUrl: './verification-dialog.component.html',
  styleUrls: ['./verification-dialog.component.scss']
})
export class VerificationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VerificationDialogComponent>) {
  }

  ngOnInit(): void {
  }

  onConfirmCode(codeRef: HTMLInputElement) {
    this.dialogRef.close(codeRef.value);
  }
}
